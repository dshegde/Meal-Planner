import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-Cookie";

export const Users = () => {
	const [users, setUsers] = useState([]);
	let user_id = Cookies.get("user_id").split('|')[1];
	const [userID, setUserID] = useState(user_id);
	useEffect(() => {
		const getUsers = async () => {
			console.log("User ID: " + userID.toString());
			/* Note that using Axios here rather than built-in Fetch causes a bit of code bloat
			* It used to be a HUGE problem, because Axios itself is huge
			* Vite, however, contains modern tree shaking (removing unused parts)
			* So if you try swapping in our project, you'll find we only save 6 kilobytes
			 */
			const users = await axios.get(
				"http://localhost:8080/users/" + userID.toString()
			);

			setUsers(await users.data);
		};
		void getUsers();
	}, [userID]);

	return (
		<div>
			<h2>Users:</h2>
			{    users ?
				<ul>{users.map((user: {email: string, name: string}) => <li key={user.email.toString()}>{user.name} - {user.email}</li>)}</ul>
				: null
			}
		</div> );
};
