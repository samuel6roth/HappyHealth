import React, {useState, useEffect} from "react";
import Button from '@material-ui/core/Button';
import './style.css'
import Container from '@material-ui/core/Container';
import axios from 'axios'

export default function Meal({meal}) {
    const [imageUrl, setImageURl] = useState("");
    
    // function sendMealData(props) {
    // return <><h1>{meal.title}</h1>
    //        <a href = {meal.sourceUrl}></a></> 

    // }


    

    useEffect(()=>{
        fetch(
            `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=471c7901604e4c7c99fe892a8ad9342b&includeNutrition=false`
        )
        .then((response) => response.json())
        .then((data)=> {
            setImageURl(data.image)
        })
        .catch(()=>{
            console.log("error");
        })
    }, [meal.id])


    function favoritesData(event) {
        event.preventDefault()
        const data = { title: meal.title, url: meal.sourceUrl, id: meal.id}
        //console.log('Success:', data)
        // axios.put('/recipes', data) // maybe use api/user/:id instead
        //     .then(data => {
        //       console.log('Success:', data);
        //     })
        //     .catch((error) => {
        //       console.error('Error:', error);
        //     });
            fetch("/recipes", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          });
          
          console.log(JSON.stringify(data))

        //   const json = res.json();
      
        //   return json;

    }

   
    return <article>
        <Container>
        <div className="meal-card">
        <h2>{meal.title}</h2>
        <img src= {imageUrl} alt="recipe" />
        {/* <ul>
            <li>Preparation time: {meal.readyInMinutes} minutes.</li>
            <li>Number of Servings: {meal.servings}</li>
        </ul> */}

        {/* <a href={meal.sourceUrl}>Go to Recipe</a> */}
            <h1>Preparation time: {meal.readyInMinutes} minutes.</h1>
            <h1>Number of Servings: {meal.servings}</h1>

        <div className='recipe-button'>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            //onClick={favoritesData} I DON'T THINK THIS IS SUPPOSED TO BE HERE
          >
                <a href={meal.sourceUrl} target="_blank">Go to Recipe</a>
            </Button>
                  </div>

        <div className='favorite-button'>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={favoritesData}
          >
            Add to Favorites
          </Button>
          </div>
     </div>
     </Container>
    </article>
}