import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-Cookie";

export const MealPlanForUser = () => {
  const [mealplanforuser, setmealplanforuser] = useState([]);
  let user_id = Cookies.get("user_id").split('|')[1];
	const [userID, setUserID] = useState(user_id);
  useEffect(() => {
    const getMealPlans = async () => {
      /* Note that using Axios here rather than built-in Fetch causes a bit of code bloat
       * It used to be a HUGE problem, because Axios itself is huge
       * Vite, however, contains modern tree shaking (removing unused parts)
       * So if you try swapping in our project, you'll find we only save 6 kilobytes
       */
      const mealplan = await axios.get("http://localhost:8080/mealplan/" + userID.toString());

      setmealplanforuser(await mealplan.data);
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
        {mealplanforuser.map((mp) => (
          <tr key={mp.id}>
            <td>{mp.mealType}</td>
            <td>{mp.dayOfWeek}</td>
            <td>{mp.recipe.recipeName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
