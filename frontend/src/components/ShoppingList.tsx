import { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Card, Table } from "react-bootstrap";
import { Form } from "react-router-dom";
import Cookies from "js-Cookie";
// @ts-ignore
const serverIP = import.meta.env.VITE_BACKEND_IP;
// @ts-ignore
const serverPort = import.meta.env.VITE_BACKEND_PORT;

const serverUrl = `http://${serverIP}:${serverPort}`;

export const ShoppingList = () => {
  const [shoppinglist, setshoppinglist] = useState([]);
  let user_id = Cookies.get("user_id");
  if (user_id !== undefined) user_id = user_id.split("|")[1];
  const [userID, setUserID] = useState(user_id);
  if (userID === undefined) {
    alert("You must be logged in to view this page");
    return <></>;
  } else {
    useEffect(() => {
      const getShoppingList = async () => {
        const shoppingList = await axios.get(
          serverUrl + "/shoppingList/" + userID.toString()
        );

        setshoppinglist(await shoppingList.data);
      };
      void getShoppingList();
    }, [userID]);

    return (
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
  }
};
