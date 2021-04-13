//listen for auth status changes
auth.onAuthStateChanged(user => {
    //check if logged in (user data) or out (null value)
    if (user) {
        console.log(user);
        //get reference to the database and get the data to show
        db.collection('recipes').get().then(snapshot => {
            setupRecipes(snapshot.docs);
            //which links to display
            setupUI(user);
        });
    } else {
        console.log('not signed in');
        //links to display -- functions in index.js
        setupUI();
        setupRecipes([]);
    }
});

// signup
const signupform = document.querySelector('#signup-form');
  //add event listener for submitting (not just clicking the button)
signupform.addEventListener('submit', (e) => {
    //prevent the default of closing the modal and refreshing the page
    e.preventDefault();

    //get user info
    const email = signupform['signup-email'].value;
    const password = signupform['signup-password'].value;

    //sign up the user -- asynchronous task (may take some time to complete & returns a promise to complete)
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupform.reset();
    });
});

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
      //also an asynchronous task -- the .then() depends on the promise sent back
    auth.signOut();
});

//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info (this is a local scope, so it won't override the const above)
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    //logging the use in
    auth.signInWithEmailAndPassword(email, password).then(cred => {
          //close the login model and reset form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });
});