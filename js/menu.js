import products from "../asserts/data/products.json" with { type: "json" };

const menuContent = document.querySelector(".menu-content");

let displayedProducts = 0;

generateMenu();

function generateMenu(category = "coffee") {
  let productsByCategory = products.filter(
    (product) => product.category == category,
  );
  menuContent.replaceChildren();
  for (let i = 0; i < productsByCategory.length; i++) {
    menuContent.appendChild(createCard(productsByCategory[i]));
    displayedProducts += 1;
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
