
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';

export const MealPlanForm = () => {
    const [mealType, setMealtype] = useState([]);
    const [dayOfWeek, setDay] = useState([]);
    const [mealPlanAll, setMealPlanAll] = useState(false);
    

    const handleSubmit = (e) => {
        setMealPlanAll(true);
    };
        useEffect(() => {
            const getMealPlans = async () => {
                const mealplan = await axios.delete(
                    "http://localhost:8080/mealplan/11/" + dayOfWeek.toString() + "/" + mealType.toString()
                );
            };
            void getMealPlans();
        }, [dayOfWeek, mealType]);
        
    
    const handleMealType=(e)=>{
      console.log(e);
      setMealtype(e)
    }
    const handleDay=(e)=>{
        console.log(e);
        setDay(e)
    }

return (
   <>
        <Row>
            <Col>
                <DropdownButton title="Meal Type" onSelect={handleMealType}>
                    <Dropdown.Item eventKey="breakfast">Breakfast</Dropdown.Item>
                    <Dropdown.Item eventKey="lunch">Lunch</Dropdown.Item>
                    <Dropdown.Item eventKey="dinner">Dinner</Dropdown.Item>
                </DropdownButton>
                <h4>You selected {mealType}</h4>
            </Col>
            <Col>
                <DropdownButton title="Day of Week" onSelect={handleDay}>
                    <Dropdown.Item eventKey="monday">Monday</Dropdown.Item>
                    <Dropdown.Item eventKey="tuesday">Tuesday</Dropdown.Item>
                    <Dropdown.Item eventKey="wednesday">Wednesday</Dropdown.Item>
                    <Dropdown.Item eventKey="thursday">Thursday</Dropdown.Item>
                    <Dropdown.Item eventKey="friday">Friday</Dropdown.Item>
                    <Dropdown.Item eventKey="saturday">Saturday</Dropdown.Item>
                    <Dropdown.Item eventKey="Sunday">Sunday</Dropdown.Item>
                </DropdownButton>
                <h4>You selected {dayOfWeek}</h4>
            </Col>
            <Col>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Delete Meal Plan
                </Button>
            </Col>
        </Row>
    { mealPlanAll ? <h1>Deleted</h1> : null}
    </>
);
}


  