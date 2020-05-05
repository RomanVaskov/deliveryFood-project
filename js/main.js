const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

//Day-1
const buttonAuth = document.querySelector(".button-auth");
const buttonOut = document.querySelector(".button-out");
const modalAuth = document.querySelector(".modal-auth");
const buttonCloseAuth = document.querySelector(".close-auth");
const logInForm = document.getElementById("logInForm");
const loginInput = document.getElementById("login");
const passwordInput = document.getElementById("password");
const userName = document.querySelector(".user-name");
const buttonLogin = document.querySelector(".button-login");

let login = localStorage.getItem("loginTest");

function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");
}

function authorized() {

  function logOut() {
    login = null;
    localStorage.removeItem("loginTest");

    buttonAuth.style.display = "block";
    buttonOut.style.display = "none";
    userName.style.display = "none";

    buttonOut.removeEventListener("click", logOut);
    checkAuth();
  }

  userName.textContent = login;
  buttonAuth.style.display = "none";
  buttonOut.style.display = "block";
  userName.style.display = "inline";

  buttonOut.addEventListener("click", logOut);
}

function notAuthorized() {

  loginInput.setAttribute("required", 1);

  function logIn(event) {
    event.preventDefault();
    if (loginInput.value) {
      login = loginInput.value;
      localStorage.setItem("loginTest", login);
    }

    toggleModalAuth();
    buttonAuth.removeEventListener("click", toggleModalAuth);
    buttonCloseAuth.removeEventListener("click", toggleModalAuth);
    logInForm.removeEventListener("submit", logIn);
    logInForm.reset();
    checkAuth();
  }

  buttonAuth.addEventListener("click", toggleModalAuth);
  buttonCloseAuth.addEventListener("click", toggleModalAuth);
  logInForm.addEventListener("submit", logIn);
}

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

checkAuth();
