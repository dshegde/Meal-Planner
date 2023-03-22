import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Card, Table } from 'react-bootstrap';
import axios from 'axios';
import "../Dashboard.css";
import Cookies from "js-Cookie";

export const PostMealPlanForm = () => {
  const [mealType, setMealType] = useState([]);
  const [day, setDay] = useState([]);
  const [recipeID, setRecipeID] = useState([]);
  const [check, setCheck] = useState(false);
  let user_id = Cookies.get("user_id");
    if (user_id !== undefined)
    user_id = user_id.split('|')[1];
    const [userID, setUserID] = useState(user_id);
    if (userID === undefined) {
      alert("You must be logged in to view this page")
		return (<></>);
    }
    else {
      const handleSubmit = (e) => {
        setCheck(true);
    };
        // e.preventDefault();
        useEffect(() => {
            
            const getMealPlans = async () => {
                const postData = {
                    userId: userID.toString(),
                    mealType: mealType.toString(),
                    dayOfWeek: day.toString(),
                    recipeId: Number(recipeID),
                  };
    
                const mealplan = await axios.post(
                    "http://localhost:8080/mealplan", postData
                ).then(response => {
                    console.log(response.data);
                  })
                  .catch(error => {
                    console.error(error);
                  });
            };
            void getMealPlans();
        }, [day, mealType, recipeID, userID]);
      
      const handleDay = (e) => {
        console.log(e);
        setDay(e);
      };
      const handleMealType = (e) => {
        console.log(e);
        setMealType(e);
      };
      const handleRecipeID = (e) => {
        console.log(e.target.value);
        setRecipeID(e.target.value);
      };
    
      return (
        <>
        <h3>Please add the existing recipe ID. View existing recipes and its ID in the Recipes tab</h3>
        <Row>
            <DropdownButton className="mt-5" title="Day of Week" onSelect={handleDay}>
                <Dropdown.Item eventKey="monday">Monday</Dropdown.Item>
                <Dropdown.Item eventKey="tuesday">Tuesday</Dropdown.Item>
                <Dropdown.Item eventKey="wednesday">Wednesday</Dropdown.Item>
                <Dropdown.Item eventKey="thursday">Thursday</Dropdown.Item>
                <Dropdown.Item eventKey="friday">Friday</Dropdown.Item>
                <Dropdown.Item eventKey="saturday">Saturday</Dropdown.Item>
                <Dropdown.Item eventKey="Sunday">Sunday</Dropdown.Item>
            </DropdownButton>
            <h4>You selected {day}</h4>
        </Row>
        <Row>
            <DropdownButton className="mt-5" title="MealT Type" onSelect={handleMealType}>
                <Dropdown.Item eventKey="breakfast">Breakfast</Dropdown.Item>
                <Dropdown.Item eventKey="lunch">Lunch</Dropdown.Item>
                <Dropdown.Item eventKey="dinner">Dinner</Dropdown.Item>
            </DropdownButton>
        <h4>You selected {mealType}</h4>
        </Row>
        <Row>
            <Form.Group controlId="RecipeID">
                <Form.Label className='mt-5'>Enter recipe ID: </Form.Label>
                <Form.Control className='mx-auto postMP' type="text" placeholder="recipeID" onChange={handleRecipeID}/>
                <h4>You selected {recipeID}</h4>
            </Form.Group>
        </Row>
        <Row>
        <Button className='mx-auto mt-5 postMP' variant="primary" size='lg' type="submit" onClick={handleSubmit}>
                        Post Meal Plan
        </Button>
        </Row>
        {check ? PostSuccess() : null}
    </>
      );
    }

  
}

const PostSuccess = () => {
    return(
        <Card className='mt-5'>
            <h1>Success!</h1>
        </Card>
    );
    
};
