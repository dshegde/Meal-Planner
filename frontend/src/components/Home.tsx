import { Link, Route, Routes } from "react-router-dom";
import { Recipes } from "./Recipe";
import { Users } from "./User";
import "../Dashboard.css";
import myImage from "../assets/Mealplanner_img1.webp";

export default function Home() {
  return (
    <div>
      <Title />
      <DashboardImage />
    </div>
  );
}

export function Title() {
  return <h1>Meal-Planner</h1>;
}

export function DashboardImage() {
  return (
    <div>
      <img className="img" src={myImage} alt="myImage" />
    </div>
  );
}
