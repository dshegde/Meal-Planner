import { Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { MealPlanForm } from "./DeleteMealPlan";
import { MealPlanFormUI } from "./MealPlanUI";
import { Recipes } from "./Recipe";
import { Users } from "./User";
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import "../Dashboard.css";
import { MealPlanForUser } from "./MealPlanAllUsers";
import { MealPlanForDay } from "./MealPlanDay";
import { ShoppingList } from "./ShoppingList";
import { RecipeSearch } from "./SearchRecipe";
import { PostMealPlanForm } from "./PostMealPlan";



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
			<Link className="btn btn-outline-dark mt-3" to="/mealplan/delete">Delete Meal Plan</Link>
			<Link className="btn btn-outline-dark mt-3" to="/mealplan/post">Post Meal Plan</Link>
			<Link className="btn btn-outline-dark mt-3" to="/shoppinglist">Shopping List</Link>
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
			<Route path="/mealplan/delete" element={<MealPlanForm/>}/>
			<Route path="/mealplan/post" element={<PostMealPlanForm/>}/>
			<Route path="/shoppinglist" element={<ShoppingList/>}/>
		</Routes>
	);
}