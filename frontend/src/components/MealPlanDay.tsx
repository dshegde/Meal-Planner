import {useEffect, useState} from "react";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Card, Table } from 'react-bootstrap';
import { Form } from "react-router-dom";
import Cookies from "js-Cookie";


export const MealPlanForDay = () => {
    const [mealplanforuser, setmealplanforuser] = useState([]);
    const [day, setDay] = useState([]);
    const [dayState, setdayState] = useState(false);
    let user_id = Cookies.get("user_id").split('|')[1];
	  const [userID, setUserID] = useState(user_id);
    
    const handleDay = (e) => {
        setDay(e);
        setdayState(true);
    };
	useEffect(() => {
		const getMP = async () => {
			const mealplan = await axios.get(
				"http://localhost:8080/mealplan/" + userID.toString() + "/" + day.toString()
			);

			setmealplanforuser(await mealplan.data);
		};
		void getMP();
	}, [day, userID]);

	return (
        <>
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
        {dayState ? dayResults(mealplanforuser) : null}
        </>
        
    );
};

const dayResults = (mealplanforuser) => {

    return(
        <Card className="mt-3">
      <Card.Body>
        <Card.Title>Meal Plan</Card.Title>
        <Table striped bordered hover>
          <thead>
            <tr>
            <th>Meal Type</th>
            <th>Day</th>
            <th>Recipe</th>
            </tr>
          </thead>
          <tbody>
            {mealplanforuser.map((mp) => (
              <tr key={mp.id}>
                <td>{mp.mealType}</td>
                <td>{mp.dayOfWeek}</td>
                <td>{mp.recipe.recipeName}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
    )
    
    
}
