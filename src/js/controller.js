import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './views/pagination.js';

if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async function () {
  try {
    //getting hash id
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    //loading recipe
    await model.loadRecipe(id);

    // rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error);
    recipeView.renderError(
      `Error: Can't find the recipe you are looking for : ${error}😭😭😭`,
    );
  }
};

const controlSearchResults = async function () {
  try {
    // 0) Load loading spinner
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(`${query}`);

    // 3) render results
    resultsView.render(model.getSearchResultsPage());

    // 4) render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {}
};

const controlPagination = function (gotoPage) {
  // 3) render new results
  resultsView.render(model.getSearchResultsPage(gotoPage));

  // 4) render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe servings (in state)
  model.updateServings(newServings);
  //update the recipe view
  recipeView.update(model.state.recipe);
};

//observer - subscriber pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHndlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
