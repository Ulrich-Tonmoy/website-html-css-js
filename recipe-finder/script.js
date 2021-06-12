const meals = document.getElementById('meals');
const favMeals = document.getElementById('fav-meals');
const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('search');
const mealPopup = document.getElementById('meal-popup');
const mealInfo = document.getElementById('meal-info');
const closePopupBtn = document.getElementById('close-popup');

getRandomMeal();
fetchFavoriteMeals();

async function getRandomMeal() {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const responseData = await response.json();
    const randomMeal = responseData.meals[0];
    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
    const responseData = await response.json();
    const mealById = responseData.meals[0];
    return mealById;
}
async function getMealBySearch(name) {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + name);
    const responseData = await response.json();
    const mealBySearch = responseData.meals;
    return mealBySearch;
}

function addMeal(mealData, random = true) {
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `<div class="meal-header">
                    ${random ? `<span class="random">Random Recipe</span>` : `<span class="random">Search Result</span>`}
                        <img class="show-img-info" src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                    </div>
                    <div class="meal-body">
                        <h4 class="show-info">${mealData.strMeal}</h4>
                        <button class="fav-btn">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>`;

    const btn = meal.querySelector(".meal-body .fav-btn");
    btn.addEventListener("click", () => {
        if (btn.classList.contains('active')) {
            removeMealFromLS(mealData.idMeal);
            btn.classList.remove('active');
        }
        else {
            addMealToLS(mealData.idMeal);
            btn.classList.add('active');
        }
        fetchFavoriteMeals();
    });

    const imgInfoBtn = meal.querySelector('.show-img-info');
    const infoBtn = meal.querySelector('.show-info');
    imgInfoBtn.addEventListener('click', () => {
        showMealInfo(mealData);
    });
    infoBtn.addEventListener('click', () => {
        showMealInfo(mealData);
    });
    meals.appendChild(meal);
}

function addMealToLS(mealId) {
    const mealIds = getMealFromLS();
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

function removeMealFromLS(mealId) {
    const mealIds = getMealFromLS();
    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id !== mealId)));
}

function getMealFromLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
    return mealIds === null ? [] : mealIds;
}

async function fetchFavoriteMeals() {
    favMeals.innerHTML = "";
    const mealIds = getMealFromLS();

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        meal = await getMealById(mealId);
        addMealToFavorite(meal);
    }
}

function addMealToFavorite(mealData) {
    const favMeal = document.createElement('li');

    favMeal.innerHTML = `<img class="show-img-info" src="${mealData.strMealThumb}" alt="${mealData.strMeal}"/>
                        <span class="show-info">${mealData.strMeal}</span>
                        <button class="clear"><i class="fas fa-window-close"></i></button>`;

    const btn = favMeal.querySelector('.clear');
    btn.addEventListener('click', () => {
        removeMealFromLS(mealData.idMeal);
        fetchFavoriteMeals();
    });
    const imgInfoBtn = favMeal.querySelector('.show-img-info');
    const infoBtn = favMeal.querySelector('.show-info');
    imgInfoBtn.addEventListener('click', () => {
        showMealInfo(mealData);
    });
    infoBtn.addEventListener('click', () => {
        showMealInfo(mealData);
    });
    favMeals.appendChild(favMeal);
}

function showMealInfo(mealData) {
    mealInfo.innerHTML = '';
    const mealElement = document.createElement('div');

    const ingredients = [];
    for (let i = 1; i < 50; i++) {
        if (mealData['strIngredient' + i]) {
            ingredients.push(`${mealData['strIngredient' + i]} : ${mealData['strMeasure' + i]}`)
        }
        else {
            break;
        }
    }

    mealElement.innerHTML = `<h1>${mealData.strMeal}</h1>
                            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                            <p>${mealData.strInstructions}</p>
                            <h3>Ingredients : Measures</h3>
                            <ul>
                            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                            </ul>`;
    mealInfo.appendChild(mealElement);
    mealPopup.classList.remove('hidden');
}

searchBtn.addEventListener('click', async () => {
    meals.innerHTML = '';
    const search = searchTerm.value;
    const mealBySearch = await getMealBySearch(search);

    if (mealBySearch) {
        mealBySearch.forEach((meal) => {
            addMeal(meal, false);
        });
    }
});

closePopupBtn.addEventListener('click', () => {
    mealPopup.classList.add('hidden');
});