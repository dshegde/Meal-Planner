import { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Card, Table } from "react-bootstrap";
import Cookies from "js-Cookie";
import { SERVER_URL } from "./Config";

export const MealPlanForDay = () => {
  const [mealPlanForUser, setMealPlanForUser] = useState([]);
  const [selectedDay, setSelectedDay] = useState([]);
  const [selectedDayState, setselectedDayState] = useState(false);

  // Get user ID from cookies
  let userIdFromCookie = Cookies.get("user_id");
  const userID = userIdFromCookie ? userIdFromCookie.split("|")[1] : undefined;
 
  if (!userID) {
    alert("You must be logged in to view this page");
    return <></>;
  } else {
    const handleSelectedDay = (e) => {
      setSelectedDay(e);
      setselectedDayState(true);
    };
    useEffect(() => {
      const fetchMealPlan = async () => {
        const mealPlan = await axios.get(
          `${SERVER_URL}/mealplan/${userID}/${selectedDay}`
        );

        setMealPlanForUser(await mealPlan.data);
      };
      void fetchMealPlan();
    }, [selectedDay, userID]);

    return (
      <>
        <Row>
          <DropdownButton
            className="mt-5"
            title="Day of Week"
            onSelect={handleSelectedDay}
          >
         {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
            <Dropdown.Item key={day} eventKey={day}>
              {day}
            </Dropdown.Item>
          ))}
          </DropdownButton>
          <h4>You selected {selectedDay}</h4>
        </Row>
        {selectedDayState ? selectedDayResults(mealPlanForUser) : null}
      </>
    );
  }
};

const selectedDayResults = (mealPlanForUser) => {
  return (
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
            {mealPlanForUser.map((mealTypeItem) => (
              <tr key={mealTypeItem.id}>
                <td>{mealTypeItem.mealType}</td>
                <td>{mealTypeItem.dayOfWeek}</td>
                <td>{mealTypeItem.recipe.recipeName}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};
