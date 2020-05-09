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
const inputSearch = document.querySelector(".input-search");
const restaurantTitle = document.querySelector(".restaurant-title");
const rating = document.querySelector(".rating");
const minPrice = document.querySelector(".price");
const category = document.querySelector(".category");
const cartModalBody = document.querySelector(".modal-body");
const cartModalPricetag = document.querySelector(".modal-pricetag");
const buttonClearCart = document.querySelector(".clear-cart");

let login = localStorage.getItem("loginTest");

let cart = [];

const getData = async function (url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
  }

  return await response.json();
}

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

    buttonAuth.style.display = "";
    buttonOut.style.display = "";
    userName.style.display = "";
    cartButton.style.display = "";

    buttonOut.removeEventListener("click", logOut);
    cardsRestaurants.removeEventListener("click", openGoods);
    checkAuth();
  }

  userName.textContent = login;
  buttonAuth.style.display = "none";
  buttonOut.style.display = "flex";
  userName.style.display = "inline";
  cartButton.style.display = "flex";

  if (cart.length === 0) {
    JSON.parse(localStorage.getItem("cartItem")).map(item => {
      cart.push({
        titleCart: item.titleCart,
        priceCart: item.priceCart,
        id: item.id,
        count: item.count
      });
    });
    renderCart();
  }

  buttonOut.addEventListener("click", logOut);
}

function notAuthorized() {

  loginInput.setAttribute("required", 1);

  function logIn(event) {
    event.preventDefault();
    if (loginInput.value.trim()) {
      login = loginInput.value;
      localStorage.setItem("loginTest", login);
    }

    toggleModalAuth();
    buttonAuth.removeEventListener("click", toggleModalAuth);
    buttonCloseAuth.removeEventListener("click", toggleModalAuth);
    cardsRestaurants.removeEventListener("click", toggleModalAuth);
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
    cardsRestaurants.addEventListener("click", openGoods);
    renderCart();
  } else {
    notAuthorized();
  }
}

//Day-2, Day-3
function createCardRestaraunt(restaurant) {
  const { name, time_of_delivery, stars, price, kitchen, image, products } = restaurant;
  const card = document.createElement("a");
  card.className = "card card-restaurant";
  card.products = products;
  card.info = [name, stars, price, kitchen];

  card.insertAdjacentHTML("beforeend", `
    <img src="${image}" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title">${name}</h3>
        <span class="card-tag tag">${time_of_delivery} мин</span>
      </div>
      <div class="card-info">
        <div class="rating">${stars}</div>
        <div class="price">От ${price} ₽</div>
        <div class="category">${kitchen}</div>
      </div>
    </div>
  `);

  cardsRestaurants.insertAdjacentElement("beforeend", card);
}

function createCardGood(menu) {
  const {
    id,
    name,
    description,
    price,
    image
  } = menu;

  const card = document.createElement("div");
  card.className = "card";

  card.insertAdjacentHTML("beforeend", `
    <img src="${image}" alt="image" class="card-image" />
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title card-title-reg">${name}</h3>
      </div>
      <div class="card-info">
        <div class="ingredients">${description}</div>
      </div>
      <div class="card-buttons">
        <button class="button button-primary button-add-cart" id="${id}">
          <span class="button-card-text">В корзину</span>
          <span class="button-cart-svg"></span>
        </button>
        <strong class="card-price card-price-bold">${price} ₽</strong>
      </div>
    </div>
  `);

  cardsMenu.insertAdjacentElement("beforeend", card);
}

function openGoods(event) {
  const target = event.target;
  const restaurant = target.closest(".card-restaurant");

  if (restaurant) {
    const [name, stars, price, kitchen] = restaurant.info;

    cardsMenu.textContent = "";
    containerPromo.classList.add("hide");
    containerRestaurants.classList.add("hide");
    menu.classList.remove("hide");

    restaurantTitle.textContent = name;
    rating.textContent = stars;
    minPrice.textContent = `От ${price} ₽`;
    category.textContent = kitchen;

    getData(`./db/${restaurant.products}`).then(data => {
      data.map(createCardGood);
    });
  }
}

//Day-4
function addToCart(event) {
  const target = event.target;
  const buttonAddToCart = target.closest(".button-add-cart");

  if (buttonAddToCart) {
    const buttonCard = target.closest(".card");
    const titleCart = buttonCard.querySelector(".card-title-reg").textContent;
    const priceCart = buttonCard.querySelector(".card-price").textContent;
    const id = buttonAddToCart.id;

    const food = cart.find(function (item) {
      return item.id === id;
    });

    if (food) {
      food.count += 1;
      localStorage.setItem("cartItem", JSON.stringify(cart));
    } else {
      cart.push({ titleCart, priceCart, id, count: 1 });
      localStorage.setItem("cartItem", JSON.stringify(cart));
    }
  }
}

function renderCart() {
  cartModalBody.textContent = "";

  cart.map(item => {
    const itemCard = `
      <div class="food-row">
        <span class="food-name">${item.titleCart}</span>
        <strong class="food-price">${item.priceCart}</strong>
        <div class="food-counter">
          <button class="counter-button counter-minus" data-id="${item.id}">-</button>
          <span class="counter">${item.count}</span>
          <button class="counter-button counter-plus" data-id="${item.id}">+</button>
        </div>
      </div>
    `;

    cartModalBody.insertAdjacentHTML("beforeend", itemCard);
  });

  const totalPrice = cart.reduce(function (result, item) {
    return result + (parseFloat(item.priceCart) * item.count);
  }, 0);

  cartModalPricetag.textContent = totalPrice + " ₽";
}

function changeCount(event) {
  const target = event.target;

  if (target.classList.contains("counter-button")) {

    const food = cart.find(function (item) {
      return item.id === target.dataset.id;
    });

    if (target.classList.contains("counter-minus")) {
      food.count--;
      localStorage.setItem("cartItem", JSON.stringify(cart));
      if (food.count === 0) {
        cart.splice(cart.indexOf(food), 1);
        localStorage.setItem("cartItem", JSON.stringify(cart));
      }
    }

    if (target.classList.contains("counter-plus")) {
      food.count++;
      localStorage.setItem("cartItem", JSON.stringify(cart));
    };

    renderCart();
  }
}

function init() {

  getData("./db/partners.json").then(data => {
    data.map(createCardRestaraunt);
  });

  cartButton.addEventListener("click", function () {
    renderCart();
    toggleModal();
  });

  cartModalBody.addEventListener("click", changeCount);
  buttonClearCart.addEventListener("click", function () {
    cart.length = 0;
    localStorage.setItem("cartItem", JSON.stringify([]));
    renderCart();
  });

  close.addEventListener("click", toggleModal);
  cardsMenu.addEventListener("click", addToCart);

  logo.addEventListener("click", function () {
    containerPromo.classList.remove("hide");
    containerRestaurants.classList.remove("hide");
    menu.classList.add("hide");
  });

  inputSearch.addEventListener('keydown', function (event) {

    if (event.keyCode === 13) {
      const target = event.target;

      const value = target.value.toLowerCase().trim();

      target.value = '';

      if (!value || value.length < 3) {
        target.style.backgroundColor = 'tomato';
        setTimeout(function () {
          target.style.backgroundColor = '';
        }, 2000);
        return;
      }

      const goods = [];

      getData('./db/partners.json')
        .then(function (data) {

          const products = data.map(function (item) {
            return item.products;
          });


          products.forEach(function (product) {
            getData(`./db/${product}`)
              .then(function (data) {

                goods.push(...data);

                const searchGoods = goods.filter(function (item) {
                  return item.name.toLowerCase().includes(value)
                })

                cardsMenu.textContent = '';

                containerPromo.classList.add('hide');
                containerRestaurants.classList.add('hide');
                menu.classList.remove('hide');

                restaurantTitle.textContent = 'Результат поиска';
                rating.textContent = '';
                minPrice.textContent = '';
                category.textContent = '';

                return searchGoods;
              })
              .then(function (data) {
                data.forEach(createCardGood);
              })
          })
        });
    }
  });

  new Swiper(".swiper-container", {
    loop: true,
    autoplay: true
  });

  checkAuth();
}

init();
