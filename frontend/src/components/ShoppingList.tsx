import {useEffect, useState} from "react";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Card, Table } from 'react-bootstrap';
import { Form } from "react-router-dom";



export const ShoppingList = () => {
    const [shoppinglist, setshoppinglist] = useState([]);
	useEffect(() => {
		const getShoppingList = async () => {
			const shoppingList = await axios.get(
				"http://localhost:8080/shoppingList/11"
			);

			setshoppinglist(await shoppingList.data);
		};
		void getShoppingList();
	}, []);
    
        return(
        <Card className="mt-3">
      <Card.Body>
        <Card.Title>Shopping List</Card.Title>
        <Table striped bordered hover>
          <thead>
            <tr>
            <th>Ingredient</th>
            </tr>
          </thead>
          <tbody>
            {shoppinglist.map((sl) => (
              <tr key={sl.id}>
                <td>{sl.ing.ingName}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
    );
};
