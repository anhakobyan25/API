const searchRecipes = document.querySelector('.searchRecipes');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe_container');
const recipeDetalisContent = document.querySelector('.recipe-detalis-content');
const recipeCloseBtn= document.querySelector('.recipe-close-btn');
const body = document.querySelector('body')

const fetchReciepes = async (query)=>{
    try{
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML= '';
    response.meals.forEach(meal  => {
        if(meal.strArea !== 'Turkish'){
        const recipeDiv = document.createElement('div')
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strArea}</p>
            <p>${meal.strCategory}</p>
            <a href="${meal.strYoutube}" target="blank">Watch on YouTube</a> 
        `
        const button =document.createElement('button');
        button.textContent = 'View Recipe';
        recipeDiv.appendChild(button);

        button.addEventListener('click',()=>{
            openRecioePopup(meal);
        })
        recipeContainer.appendChild(recipeDiv);
        }
    })
        body.style.background = 'linear-gradient(-1000deg, #b9fff486,rgba(141, 231, 234, 0.502)), url("1\ PJkl6Zv9lMWWBiuoixWA3Q.jpg")';
        body.style.backgroundSize = 'cover';
        body.style.backgroundAttachment = 'fixed';
        body.style.color = 'white';
    } catch(error){
        recipeContainer.innerHTML= '<h2>Error in fetching recipes...</h2>';
    }
}

const categoryBtns = document.querySelectorAll('.category-btn');

const fetchIngredients = (meal) =>{
    let ingredientsList = ''
    for(let i = 1; i <= 25; i++){
        const ingredient = meal[`strIngredient${i}`]
        if(ingredient){
            const measure = meal[`strMeasure${i}`]
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }else{
            break;
        }
    }
    return ingredientsList;
}

const openRecioePopup = (meal)=>{
    recipeDetalisContent.innerHTML= `
        <h2 class='recipeName'> ${meal.strMeal}</h2>
        <div class='recipeInstructions'>
            <h3>Instructions: </h3>
            <p>${meal.strInstructions}</p>
        </div>
        <h3>Ingredients: </h3>
        <ul class='ingredientList'>${fetchIngredients(meal)}</ul>
    `
    recipeDetalisContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', ()=>{
    recipeDetalisContent.parentElement.style.display ='none'
})



const handleSearch = (e) => {
    e.preventDefault();
    const searchInput = searchRecipes.value.trim();
    if (!searchInput) {
        recipeContainer.innerHTML = `<h2>Type the meal in the search box.</h2>`;
        return;
    }
    fetchReciepes(searchInput);
};

searchBtn.addEventListener('click', handleSearch);

searchRecipes.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleSearch(e);
    }
});
