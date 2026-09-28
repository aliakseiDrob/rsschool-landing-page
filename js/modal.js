import createElement from "./utils/create-element.js";
import products from "../asserts/data/products.json" with { type: "json" };

function createModal(item, parent) {
  let modalOverlay = createElement({
    cssClasses: ["modal-overlay"],
    parent,
  });

  let modalContent = createElement({
    cssClasses: ["modal-content"],
    parent: modalOverlay,
  });

  let imageContainer = createElement({
    cssClasses: ["modal-image-container"],
    parent: modalContent,
  });

  createElement({
    tag: "img",
    attributes: {
      id: "modal-img",
      src: item.url,
      alt: item.name,
    },
    parent: imageContainer,
  });

  let modalInfo = createElement({
    cssClasses: ["modal-info"],
    parent: modalContent,
  });

  createElement({
    tag: "h3",
    cssClasses: ["modal-title"],
    text: item.name,
    parent: modalInfo,
  });

  createElement({
    tag: "p",
    cssClasses: ["modal-description"],
    text: item.description,
    parent: modalInfo,
  });

  let sizeGroup = createElement({
    cssClasses: ["param-group"],
    parent: modalInfo,
  });

  createElement({
    tag: "span",
    cssClasses: ["param-title"],
    text: "Size",
    parent: sizeGroup,
  });

  let sizeOptions = createElement({
    attributes: { id: "size-options" },
    cssClasses: ["param-options"],
    parent: sizeGroup,
  });

  const sizes = [
    { label: "S", value: "200 ml", active: true },
    { label: "M", value: "300 ml" },
    { label: "L", value: "400 ml" },
  ];

  sizes.forEach((size) => {
    let btnClasses = ["button", "param-btn"];
    if (size.active) btnClasses.push("active");

    let btn = createElement({
      tag: "button",
      cssClasses: btnClasses,
      attributes: { type: "button" },
      parent: sizeOptions,
    });

    createElement({
      tag: "span",
      cssClasses: ["icon-circle"],
      text: size.label,
      parent: btn,
    });

    createElement({
      tag: "span",
      text: size.value,
      parent: btn,
    });
  });

  let additivesGroup = createElement({
    cssClasses: ["param-group"],
    parent: modalInfo,
  });

  createElement({
    tag: "span",
    cssClasses: ["param-title"],
    text: "Additives",
    parent: additivesGroup,
  });

  let additivesOptions = createElement({
    attributes: { id: "additives-options" },
    cssClasses: ["param-options"],
    parent: additivesGroup,
  });

  const additives = [
    { num: "1", name: "Sugar" },
    { num: "2", name: "Cinnamon" },
    { num: "3", name: "Syrup" },
  ];

  additives.forEach((additive) => {
    let btn = createElement({
      tag: "button",
      cssClasses: ["button", "param-btn"],
      attributes: { type: "button" },
      parent: additivesOptions,
    });

    createElement({
      tag: "span",
      cssClasses: ["icon-circle"],
      text: additive.num,
      parent: btn,
    });

    createElement({
      tag: "span",
      text: additive.name,
      parent: btn,
    });
  });

  let modalTotal = createElement({
    cssClasses: ["modal-total"],
    parent: modalInfo,
  });

  createElement({
    tag: "span",
    text: "Total:",
    parent: modalTotal,
  });

  createElement({
    tag: "span",
    attributes: { id: "modal-total-price" },
    text: item.price,
    parent: modalTotal,
  });

  createElement({
    tag: "p",
    cssClasses: ["modal-note"],
    text: "The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.",
    parent: modalInfo,
  });

  createElement({
    tag: "button",
    cssClasses: ["button", "btn-close"],
    attributes: { type: "button", id: "modal-close-btn" },
    text: "Close",
    parent: modalInfo,
    // events: { click: () => modalOverlay.remove() }
  });

  return modalOverlay;
}
