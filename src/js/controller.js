import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';



import 'core-js/stable'
import 'regenerator-runtime/runtime'



const controlRecipe = async function () {
  try {

    const id = window.location.hash.slice(1);
    console.log("id: ", id);
    if (!id) return;
    recipeView.renderSpinner()

    // todo: Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks)


    //todo: Step1--> Loading recipe
    await model.loadRecipe(id);


    //todo: Step2--> Rendering recipe
    recipeView.render(model.state.recipe);


  }
  catch (err) {
    console.log(err);
    recipeView.renderError();
  }
}


const controlSearchResults = async function () {
  try {

    resultsView.renderSpinner();
    // todo:1. GET SEARCH QUERY
    const query = searchView.getQuery();
    if (!query) return;

    // TODO:2. LOAD SEARCH RESULTS
    await model.loadSearchResults(query)

    // TODO:3. RENDER RESULTS
    console.log(model.state.search.results);
    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultsPage())

    // TODO:4. Render initial pagination buttons
    paginationView.render(model.state.search);
  }
  catch (err) {
    console.log(err);
  }
}



const controlPagination = function (goToPage) {
  // TODO:1. RENDER NEW RESULTS
  console.log(model.state.search.results);
  // resultsView.render(model.state.search.results)
  resultsView.render(model.getSearchResultsPage(goToPage))

  // TODO:2. Render NEW pagination buttons
  paginationView.render(model.state.search);
}


const controlServings = function (newServings) {
  //todo: Update the recipe servings(in state)
  model.updateServings(newServings);

  //todo: Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function () {
  //todo: 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe)
  }

  else {
    model.deleteBookmark(model.state.recipe.id)
  }
  
  //todo: 2) Update recipe view 
  recipeView.update(model.state.recipe)

  // todo:3) Render bookmarks
  bookmarksView.render(model.state.bookmarks)
}

const init = function () {
  recipeView.addHandlerRender(controlRecipe)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
}
init();