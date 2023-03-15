
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';

export const MealPlanForm = () => {
    const [mealtype, setMealtype] = useState([]);
    const [day, setDay] = useState([]);
    const [userID, setUserID] = useState([]);
    const [mealPlanAll, setMealPlanAll] = useState(false);

    const handleSubmit = (e) => {
        if(userID == null) {
            alert("Please enter a user ID");
        }
        else if(mealtype == null && day == null) {
            setMealPlanAll(true);

        }
        else {
            alert(day);
        }
    }
    const handleMealType=(e)=>{
      console.log(e);
      setMealtype(e)
    }
    const handleDay=(e)=>{
        console.log(e);
        setDay(e)
        alert(day);
    }
    const handleUserID=(e)=>{
        console.log(e);
        setUserID(e.target.value)
    }
return (
   <>
    <Form onSubmit={handleSubmit}>
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
    { mealPlanAll ? MealPlanForUser1() : null}
    </>
);
}

const MealPlanForUser1 = () => {
    // const [mealplanforuser1, setmealplanforuser1] = useState([]);
    // // const [userid, setuserid] = useState(userID);
	// useEffect(() => {
	// 	const getMealPlans1 = async () => {
	// 		const mealplan = await axios.get(
	// 			"http://localhost:8080/mealplan/11"
	// 		);

	// 		setmealplanforuser1(await mealplan.data);
	// 	};
	// 	void getMealPlans1();
	// }, []);

    return (
        <>
        <table>
                <thead>
                  <tr>
                    <th>Meal Type</th>
                    <th>Day</th>
                    <th>Recipe</th>
                  </tr>
                </thead>
                {/* <tbody>
                  {mealplanforuser1.map(mp => (
                    <tr key={mp.id}>
                      <td>{mp.mealType}</td>
                      <td>{mp.dayOfWeek}</td>
                      <td>{mp.recipe.recipeName}</td>
                    </tr>
                  ))}
                </tbody> */}
              </table>
              </>
    );

};


  