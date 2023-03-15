import { Link, Route, Routes } from "react-router-dom";
import { Recipes } from "./Recipe";
import {Users} from "./User";
import "../Dashboard.css";
import myImage from "../assets/dashboard_image.jpeg";


export default function Home() {
  return (<div>
      <Title/>
	  <DashboardImage/>
    </div>
  );
}

export function Title() {
  return (<h1>Meal-Planner</h1>)
}

export function DashboardImage() {
	return (<div><img className="image" src={myImage} alt="myImage" /></div>)
}

// export function NavMain() {
// 	return (
// 		<>
// 			<PublicLinksView/>
// 			<NavRoutes/>
// 		</>
// 	);
// }

// function PublicLinksView() {
// 	return (
// 		<>
// 			<Link to="/">Home</Link>
//       		<Link to="/users">Users</Link>
// 			<Link to="/recipes">Recipes</Link>
// 			<Link to="/mealplan">MealPlan</Link>
// 		</>
// 	)
// }

// function NavRoutes() {
// 	return (
// 		<Routes>
// 			<Route path="/users" element={<Users/>}/>
// 			<Route path="/recipes" element={<Recipes/>}/>
// 			<Route path="/mealplan" element={<DropdownMenu/>}/>
// 			<Route path="/" element={<Home/>}/>
// 		</Routes>
// 	);
// }



