import { Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { MealPlanForm, MealPlanUI } from "./MealPlan";
import { Recipes } from "./Recipe";
import { Users } from "./User";

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
			<Link to="/">Home</Link>
      <Link to="/users">Users</Link>
			<Link to="/recipes">Recipes</Link>
            <Link to="/mealplan">MealPlan</Link>
		</>
	)
}

function NavRoutes() {
	return (
		<Routes>
			<Route path="/users" element={<Users/>}/>
			<Route path="/recipes" element={<Recipes/>}/>
            <Route path="/mealplan" element={<MealPlanForm/>}/>
		</Routes>
	);
}