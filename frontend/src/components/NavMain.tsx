import { Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { MealPlanForm } from "./DeleteMealPlan";
import { Recipes } from "./Recipe";
import { Users } from "./User";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import "../Dashboard.css";
import { MealPlanForUser } from "./MealPlanAllUsers";
import { MealPlanForDay } from "./MealPlanDay";
import { ShoppingList } from "./ShoppingList";
import { PostMealPlanForm } from "./PostMealPlan";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Cookies from "js-Cookie";


export function NavMain() {
  return (
    <>
      <PublicLinksView />
      <NavRoutes />
    </>
  );
}

function PublicLinksView() {
	if (Cookies.get("user_id")) {
		return (<Navbar fixed="top" bg="light" expand="lg">
		<Container>
		  <Navbar.Brand>
			<Link to="/">Home</Link>
		  </Navbar.Brand>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
		  <Navbar.Collapse id="basic-navbar-nav">
			<Nav className="me-auto">
			  <Nav.Link>
				<Link to="/users">Users</Link>
			  </Nav.Link>
			  <Nav.Link>
				<Link to="/recipes">recipes</Link>
			  </Nav.Link>
			  <Nav.Link>
				<Link to="/shoppinglist">Shopping List</Link>
			  </Nav.Link>
			  <NavDropdown title="MealPlans" id="basic-nav-dropdown">
				<NavDropdown.Item>
				  <Link to="/mealplan/all">All MealPlan</Link>
				</NavDropdown.Item>
				<NavDropdown.Item>
				  <Link to="/mealplan/day">MealPlan for a day</Link>
				</NavDropdown.Item>
				<NavDropdown.Item>
				  <Link to="/mealplan/delete">Delete Meal Plan</Link>
				</NavDropdown.Item>
				<NavDropdown.Item>
				  <Link to="/mealplan/post">Post Meal Plan</Link>
				</NavDropdown.Item>
			  </NavDropdown>
			</Nav>
			<Nav>
			  <Button variant="outline-primary" onClick={LogOutFunc}>
				Logout
			  </Button>
			</Nav>
		  </Navbar.Collapse>
		</Container>
	  </Navbar>);
	}
	else {
		return (<Navbar fixed="top" bg="light" expand="lg">
		<Container>
		  <Navbar.Brand>
			<Link to="/">Home</Link>
		  </Navbar.Brand>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
		  <Navbar.Collapse id="basic-navbar-nav">
			<Nav className="me-auto">
			  <Nav.Link>
				<Link to="/users">Users</Link>
			  </Nav.Link>
			  <Nav.Link>
				<Link to="/recipes">recipes</Link>
			  </Nav.Link>
			  <Nav.Link>
				<Link to="/shoppinglist">Shopping List</Link>
			  </Nav.Link>
			  <NavDropdown title="MealPlans" id="basic-nav-dropdown">
				<NavDropdown.Item>
				  <Link to="/mealplan/all">All MealPlan</Link>
				</NavDropdown.Item>
				<NavDropdown.Item>
				  <Link to="/mealplan/day">MealPlan for a day</Link>
				</NavDropdown.Item>
				<NavDropdown.Item>
				  <Link to="/mealplan/delete">Delete Meal Plan</Link>
				</NavDropdown.Item>
				<NavDropdown.Item>
				  <Link to="/mealplan/post">Post Meal Plan</Link>
				</NavDropdown.Item>
			  </NavDropdown>
			</Nav>
			<Nav>
			  <Button variant="outline-primary" onClick={LoginFunc}>
				Login
			  </Button>
			</Nav>
		  </Navbar.Collapse>
		</Container>
	  </Navbar>);
	}

}

function NavRoutes() {
  return (
    <Routes>
      <Route path="/users" element={<Users />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/mealplan/all" element={<MealPlanForUser />} />
      <Route path="/mealplan/day" element={<MealPlanForDay />} />
      <Route path="/mealplan/delete" element={<MealPlanForm />} />
      <Route path="/mealplan/post" element={<PostMealPlanForm />} />
      <Route path="/shoppinglist" element={<ShoppingList />} />
    </Routes>
  );
}

function LoginFunc() {
  window.location.href = "http://localhost:3000/login";
}

function LogOutFunc() {
  window.location.href = "http://localhost:3000/logout";
}
