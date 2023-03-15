
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export const MealPlanForm = () => {
return (
    <Form>
        <Row>
            <Col>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Enter user: </Form.Label>
                    <Form.Control type="text" placeholder="userID" />
                </Form.Group>
            </Col>
            <Col>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        MealType
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">All</Dropdown.Item>
                        <Dropdown.Item href="#/action-1">Breakfast</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Lunch</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Dinner</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            <Col>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Day Of Week
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-3">All</Dropdown.Item>
                        <Dropdown.Item href="#/action-1">Monday</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Tuesday</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Wednesday</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Thursday</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Friday</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Saturday</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Sunday</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            <Col>
                <Button variant="primary" type="submit">
                    Get Meal Plan
                </Button>
            </Col>
        </Row>
    </Form>
);
}
  