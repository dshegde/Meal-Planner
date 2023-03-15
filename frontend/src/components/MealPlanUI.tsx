import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { MealPlanForUser } from './MealPlanAllUsers';

const [mealtype, setMealtype] = useState([]);
const [day, setDay] = useState([]);
const [userID, setUserID] = useState([]);

export const MealPlanFormUI = () => {
    const handleMealType=(e)=>{
      console.log(e);
      setMealtype(e)
    }
    const handleDay=(e)=>{
        console.log(e);
        setDay(e)
    }
    const handleUserID=(e)=>{
        console.log(e);
        setUserID(e.target.value)
    }

    return (
        <Form onSubmit={MealPlanFormSubmit}>
            <Row>
                <Col>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Enter user: </Form.Label>
                        <Form.Control type="text" placeholder="userID" onChange={handleUserID}/>
                        <h4>You selected {userID}</h4>
                    </Form.Group>
                </Col>
                <Col>
                    <DropdownButton title="Meal Type" onSelect={handleMealType}>
                        <Dropdown.Item>All</Dropdown.Item>
                        <Dropdown.Item eventKey="breakfast">Breakfast</Dropdown.Item>
                        <Dropdown.Item eventKey="lunch">Lunch</Dropdown.Item>
                        <Dropdown.Item eventKey="dinner">Dinner</Dropdown.Item>
                    </DropdownButton>
                    <h4>You selected {mealtype}</h4>
                </Col>
                <Col>
                    <DropdownButton title="Day of Week" onSelect={handleDay}>
                        <Dropdown.Item>All</Dropdown.Item>
                        <Dropdown.Item eventKey="monday">Monday</Dropdown.Item>
                        <Dropdown.Item eventKey="tuesday">Tuesday</Dropdown.Item>
                        <Dropdown.Item eventKey="wednesday">Wednesday</Dropdown.Item>
                        <Dropdown.Item eventKey="thursday">Thursday</Dropdown.Item>
                        <Dropdown.Item eventKey="friday">Friday</Dropdown.Item>
                        <Dropdown.Item eventKey="saturday">Saturday</Dropdown.Item>
                        <Dropdown.Item eventKey="Sunday">Sunday</Dropdown.Item>
                    </DropdownButton>
                    <h4>You selected {day}</h4>
                </Col>
                <Col>
                    <Button variant="primary" type="submit">
                        Get Meal Plan
                    </Button>
                </Col>
                <Col>
                    <Button variant="primary" type="button">
                        Delete Meal Plan
                    </Button>
                </Col>
            </Row>
        </Form>
    );

}

export function MealPlanFormSubmit() {

    const handleSubmit = (e) => {
        if(userID == null) {
            alert("Please enter a user ID");
        }
        else if(mealtype == null && day == null) {
            return(<MealPlanForUser/>);
        }
        else {
            alert("TODO");
        }
    }
    
}