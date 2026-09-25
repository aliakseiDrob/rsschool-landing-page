import products from "../asserts/data/products.json" with { type: "json" };
import createElement from "./utils/create-element.js";

const menuContent = document.querySelector(".menu-content");
const menuControls = document.querySelector(".controls");

generateMenu();

function generateMenu(category = "coffee") {
  let productsByCategory = products.filter(
    (product) => product.category === category,
  );

  const fragment = document.createDocumentFragment();

  productsByCategory.forEach((product) => createCard(product, fragment));

  menuContent.replaceChildren(fragment);
}

function createCard(item, parent) {
  let productCard = createElement({
    cssClasses: ["product"],
    parent,
  });

  let imageWrapper = createElement({
    cssClasses: ["image_wrapper"],
    parent: productCard,
  });

  createElement({
    tag: "img",
    attributes: {
      src: item.url,
      alt: `${item.name} — ${item.description}`,
      loading: "lazy",
    },
    parent: imageWrapper,
  });

  let infoWrapper = createElement({
    cssClasses: ["info-block"],
    parent: productCard,
  });

  createElement({
    tag: "h3",
    cssClasses: ["title"],
    text: item.name,
    parent: infoWrapper,
  });

  createElement({
    tag: "p",
    cssClasses: ["description"],
    text: item.description,
    parent: infoWrapper,
  });

  createElement({
    tag: "p",
    cssClasses: ["price"],
    text: item.price,
    parent: infoWrapper,
  });
  return productCard;
}

function changeCategory(event) {
  const categoryBtn = event.target.closest(".category-btn");
  if (categoryBtn && !categoryBtn.classList.contains("active")) {
    [...menuControls.children].forEach((btn) => btn.classList.remove("active"));
    generateMenu(categoryBtn.value);
    categoryBtn.classList.add("active");
  }
}

menuControls.addEventListener("click", changeCategory);
