import { Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { MealPlanForm } from "./MealPlan";
import { MealPlanFormUI } from "./MealPlanUI";
import { Recipes } from "./Recipe";
import { Users } from "./User";
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import "../Dashboard.css";
import { MealPlanForUser } from "./MealPlanAllUsers";
import { MealPlanForDay } from "./MealPlanDay";



export function NavMain() {
	return (
		<>
			<PublicLinksView/>
			<NavRoutes/>
		</>
	);
}

function PublicLinksView() {
	return (
		<>
			<Link className="btn btn-outline-dark mt-3" to="/">Home</Link>
			<Link className="btn btn-outline-dark mt-3" to="/users">Users</Link>
			<Link className="btn btn-outline-dark mt-3" to="/recipes">Recipes</Link>
            {/* <Link className="btn btn-outline-dark mt-3" to="/mealplan">MealPlan</Link> */}
			<Link className="btn btn-outline-dark mt-3" to="/mealplan/all">All MealPlan</Link>
			<Link className="btn btn-outline-dark mt-3" to="/mealplan/day">MealPlan for a day</Link>
		</>
	)
}

function NavRoutes() {
	return (
		<Routes>
			<Route path="/users" element={<Users/>}/>
			<Route path="/recipes" element={<Recipes/>}/>
            {/* <Route path="/mealplan" element={<MealPlanForm/>}/> */}
			<Route path="/mealplan/all" element={<MealPlanForUser/>}/>
			<Route path="/mealplan/day" element={<MealPlanForDay/>}/>
		</Routes>
	);
}