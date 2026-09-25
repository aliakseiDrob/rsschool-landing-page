import products from "../asserts/data/products.json" with { type: "json" };

const menuContent = document.querySelector(".menu-content");

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

  let image = createElement({
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

function createElement({
  tag = "div",
  cssClasses = [],
  text = "",
  attributes = {},
  events = {},
  parent = null,
} = {}) {
  const element = document.createElement(tag);

  if (cssClasses.length > 0) {
    element.classList.add(...cssClasses);
  }

  if (text) {
    element.textContent = text;
  }

  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  for (const [eventType, listener] of Object.entries(events)) {
    element.addEventListener(eventType, listener);
  }

  if (parent) {
    parent.append(element);
  }

  return element;
}
