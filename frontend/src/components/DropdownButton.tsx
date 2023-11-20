import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export const daysOfWeeksOptions = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
];
export const mealTypeOptions = ["breakfast", "lunch", "dinner"];

// Extracted Dropdown Selector Component
export const DropdownSelector = ({ title, options, onSelect, selectedValue }) => (
    <DropdownButton className="mt-5" title={title} onSelect={onSelect}>
    {options.map((option) => (
      <Dropdown.Item key={option} eventKey={option} active={selectedValue === option}>
        {option}
      </Dropdown.Item>
    ))}
  </DropdownButton>
);