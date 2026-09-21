import products from "../asserts/data/products.json" with { type: "json" };

const refreshButtonWrapper = document.querySelector(".refresh_button_wrapper");
const menuWrapper = document.querySelector(".grid_menu_wrapper");

let displayedProducts = 0;

generateMenu();

function generateMenu(category = "coffee") {
  refreshButtonWrapper.style.display = "none";
  let productsByCategory = products.filter(
    (product) => product.category == category,
  );
  menuWrapper.replaceChildren();
  if (window.innerWidth <= 768) {
    for (let i = 0; i < 4; i++) {
      menuWrapper.appendChild(createCard(productsByCategory[i]));
      displayedProducts += 1;
    }
    if (displayedProducts < productsByCategory.length) {
      refreshButtonWrapper.style.display = "flex";
    }
  } else {
    for (let i = 0; i < productsByCategory.length; i++) {
      menuWrapper.appendChild(createCard(productsByCategory[i]));
      displayedProducts += 1;
    }
  }
}

function createCard(item) {
  let productCard = document.createElement("div");
  productCard.classList.add("product");
  productCard.innerHTML = `<div class="image_wrapper"> \n
    <img class=${item.category} src="${item.url}" alt="${item.name}"> \n </div> \n
    <div class="info-block">\n
    <div class="title">${item.name}</div> \n
    <div class="description">${item.description}</div>
    <div class="price">$${item.price}</div> \n
    </div>`;
  return productCard;
}
