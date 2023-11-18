import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-Cookie";
import { SERVER_URL } from "./Config";

export const MealPlanForUser = () => {
  const [mealPlanForUser, setMealPlanForUser] = useState([]);
  let user_id = Cookies.get("user_id");
  if (user_id !== undefined) user_id = user_id.split("|")[1];
  const [userID, setUserID] = useState(user_id);
  if (userID === undefined) {
    alert("You must be logged in to view this page");
    return <></>;
  } else {
    useEffect(() => {
      const getMealPlans = async () => {
        /* Note that using Axios here rather than built-in Fetch causes a bit of code bloat
         * It used to be a HUGE problem, because Axios itself is huge
         * Vite, however, contains modern tree shaking (removing unused parts)
         * So if you try swapping in our project, you'll find we only save 6 kilobytes
         */
        const mealplan = await axios.get(
          SERVER_URL + "/mealplan/" + userID.toString()
        );

        setMealPlanForUser(await mealplan.data);
      };
      void getMealPlans();
    }, [userID]);

    return (
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Meal Type</th>
            <th scope="col">Day</th>
            <th scope="col">Recipe</th>
          </tr>
        </thead>
        <tbody>
          {mealPlanForUser.map((mealPlanItem) => (
            <tr key={mealPlanItem.id}>
              <td>{mealPlanItem.mealType}</td>
              <td>{mealPlanItem.dayOfWeek}</td>
              <td>{mealPlanItem.recipe.recipeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
};
