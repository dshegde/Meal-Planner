import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import Cookies from "js-Cookie";
import { SERVER_URL } from "./Config";

// Main Component
export const MealPlanForm = () => {
  const [selectedMealType, setSelectedMealtype] = useState([]);
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState([]);
  const [mealPlanDeleted, setMealPlanDeleted] = useState(false);

  let user_id = Cookies.get("user_id");
  if (user_id !== undefined) user_id = user_id.split("|")[1];
  const [userID, setUserID] = useState(user_id);
  if (userID === undefined) {
    alert("You must be logged in to view this page");
    return;
  } else {
    const handleSubmit = (e) => {
      setMealPlanDeleted(true);
    };
    useEffect(() => {
      const getMealPlans = async () => {
        const mealplan = await axios.delete(
          `${SERVER_URL}/mealplan/${userID}/${selectedDayOfWeek}/${selectedMealType}`
        );
      };
      void getMealPlans();
    }, [selectedDayOfWeek, selectedMealType, userID]);

    const handleMealType = (e) => {
      console.log(e);
      setSelectedMealtype(e);
    };
    const handleDay = (e) => {
      console.log(e);
      setSelectedDayOfWeek(e);
    };

    return (
      <>
        <Row>
          <Col>
            <DropdownSelector
              title="Meal Type"
              options={["breakfast", "lunch", "dinner"]}
              onSelect={handleMealType}
            />
            <h4>You selected {selectedMealType}</h4>
          </Col>
          <Col>
            <DropdownSelector
              title="Day of Week"
              options={[
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday",
              ]}
              onSelect={handleDay}
            />
            <h4>You selected {selectedDayOfWeek}</h4>
          </Col>
          <Col>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Delete Meal Plan
            </Button>
          </Col>
        </Row>
        {mealPlanDeleted ? <h1>Deleted</h1> : null}
      </>
    );
  }
};

// Extracted Dropdown Selector Component
const DropdownSelector = ({ title, options, onSelect }) => (
  <DropdownButton title={title} onSelect={onSelect}>
    {options.map((option, index) => (
      <Dropdown.Item key={index} eventKey={option}>
        {option.charAt(0).toUpperCase() + option.slice(1)}
      </Dropdown.Item>
    ))}
  </DropdownButton>
);
