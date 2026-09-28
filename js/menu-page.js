import generateMenu from "./menu.js";
import { updateModal, showModal } from "./modal.js";
import products from "../asserts/data/products.json" with { type: "json" };

const menuContent = document.querySelector(".menu-content");
const menuControls = document.querySelector(".controls");
const showMoreBtn = document.querySelector(".show-more-btn");

generateMenu();

menuControls.addEventListener("click", changeCategory);
showMoreBtn.addEventListener("click", showMoreCards);
menuContent.addEventListener("click", (event) => {
  const productCard = event.target.closest(".product");
  if (productCard) {
    const product = products.find(
      (product) => product.id == productCard.dataset.id,
    );
    if (product) {
      updateModal(product);
      showModal();
    }
  }
});

function changeCategory(event) {
  const categoryBtn = event.target.closest(".category-btn");
  if (categoryBtn && !categoryBtn.classList.contains("active")) {
    [...menuControls.children].forEach((btn) => btn.classList.remove("active"));
    generateMenu(categoryBtn.value);
    categoryBtn.classList.add("active");
  }
}

function showMoreCards() {
  menuContent.classList.add("expanded");
}
