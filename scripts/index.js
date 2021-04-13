//get classes for links
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

//determine if user logged in to show correct links
const setupUI = (user) => {
  if (user) {
    //toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    //toggle UI elements - links to show
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

//setup the recipes
const recipeList = document.querySelector('.recipes');

const setupRecipes = (data) => {
  //check for length on the data...this references auth.js where user is logged or not
  if(data.length) {
    //template string and append to recipeList
    let html = '';
    data.forEach(doc => {
      const recipe = doc.data();
      //output data to the DOM
      const li = `
        <li> 
          <div class="collapsible-header grey lighten-4"><h4>${recipe.title}</h4></div>
          <div class="collapsible-body white">
            <div class="row">
              <div class="col s2"><img src="${recipe.img}"></div>
              <div class="col s10">
                <h5>Ingredients</h5>
                <p>${recipe.ingredients}</p>
              </div>
            </div>
            <h5>Directions</h5>
            <p>${recipe.directions}</p>
          </div>
        </li>
      `;
        //cycle through data and append to ul
      html += li
    });
      //outputs to the DOM
    recipeList.innerHTML = html;
  } else {
    recipeList.innerHTML = `<h5 class="center-align">Sign up or login to see the recipes.</h5>`
  
  }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});