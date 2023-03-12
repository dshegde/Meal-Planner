import {useEffect, useState} from "react";
import axios from "axios";
export const Recipes = () => {
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		const getRecipes = async () => {
			/* Note that using Axios here rather than built-in Fetch causes a bit of code bloat
			* It used to be a HUGE problem, because Axios itself is huge
			* Vite, however, contains modern tree shaking (removing unused parts)
			* So if you try swapping in our project, you'll find we only save 6 kilobytes
			 */
			const recipes = await axios.get(
				"http://localhost:8080/recipes"
			);

			setRecipes(await recipes.data);
		};
		void getRecipes();
	}, []);

	return (
              <table>
                <thead>
                  <tr>
                    <th>Recipe ID</th>
                    <th>Recipe Name</th>
                    <th>Diet Type</th>
                    <th>Cuisine</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {recipes.map(recipe => (
                    <tr key={recipe.id}>
                      <td>{recipe.recipeName}</td>
                      <td>{recipe.dietType}</td>
                      <td>{recipe.cuisine}</td>
                      <td>{recipe.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
    );

  
    // return (
    //   <div>
    //     <h2>Recipes:</h2>
    //     {    recipes ?
    //       <ul>{recipes.map((recipe: {recipeName: string, dietType: string, cuisine: string, description: string}) => <li key={recipe.recipeName.toString()}>{recipe.recipeName} - {recipe.dietType} -{recipe.cuisine} - {recipe.description}</li>)}</ul>
    //       : null
    //     }
    //   </div> );
  
};
