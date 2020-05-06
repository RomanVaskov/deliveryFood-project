"use strict";
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
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
const cardsRestaurants = document.querySelector(".cards-restaurants");
const containerPromo = document.querySelector(".container-promo");
const containerRestaurants = document.querySelector(".restaurants");
const menu = document.querySelector(".menu");
const cardsMenu = document.querySelector(".cards-menu");
const logo = document.querySelector(".logo");

let login = localStorage.getItem("loginTest");

function toggleModal() {
  modal.classList.toggle("is-open");
}

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
    cardsRestaurants.removeEventListener("click", openGoods);
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
    if (loginInput.value.trim()) {
      login = loginInput.value;
      localStorage.setItem("loginTest", login);
      cardsRestaurants.addEventListener("click", openGoods);
    }

    toggleModalAuth();
    buttonAuth.removeEventListener("click", toggleModalAuth);
    buttonCloseAuth.removeEventListener("click", toggleModalAuth); cardsRestaurants.removeEventListener("click", toggleModalAuth);
    logInForm.removeEventListener("submit", logIn);
    logInForm.reset();
    checkAuth();
  }

  buttonAuth.addEventListener("click", toggleModalAuth);
  buttonCloseAuth.addEventListener("click", toggleModalAuth);
  logInForm.addEventListener("submit", logIn);

  cardsRestaurants.addEventListener("click", toggleModalAuth);
}

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

//Day-2
function createCardRestaraunt() {
  const card = `
    <a class="card card-restaurant">
      <img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">Пицца плюс</h3>
          <span class="card-tag tag">50 мин</span>
        </div>
        <div class="card-info">
          <div class="rating">
            4.5
          </div>
          <div class="price">От 900 ₽</div>
          <div class="category">Пицца</div>
        </div>
      </div>
    </a>
  `;

  cardsRestaurants.insertAdjacentHTML("beforeend", card);
}

function createCardGood() {
  const card = document.createElement("div");
  card.className = "card";

  card.insertAdjacentHTML("beforeend", `
    <img src="img/pizza-plus/pizza-oleole.jpg" alt="image" class="card-image" />
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title card-title-reg">Пицца Оле-Оле</h3>
      </div>
      <div class="card-info">
        <div class="ingredients">Соус томатный, сыр «Моцарелла», черри, маслины, зелень, майонез
        </div>
      </div>
      <div class="card-buttons">
        <button class="button button-primary button-add-cart">
          <span class="button-card-text">В корзину</span>
          <span class="button-cart-svg"></span>
        </button>
        <strong class="card-price-bold">440 ₽</strong>
      </div>
    </div>
  `);

  cardsMenu.insertAdjacentElement("beforeend", card);
}

function openGoods(event) {
  const target = event.target;
  const restaurant = target.closest(".card-restaurant");

  if (restaurant) {
    cardsMenu.textContent = "";
    containerPromo.classList.add("hide");
    containerRestaurants.classList.add("hide");
    menu.classList.remove("hide");

    createCardGood();
  }
}

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);


logo.addEventListener("click", function () {
  containerPromo.classList.remove("hide");
  containerRestaurants.classList.remove("hide");
  menu.classList.add("hide");
});

checkAuth();
createCardRestaraunt();