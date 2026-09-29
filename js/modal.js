import createElement from "./utils/create-element.js";

let modalOverlay = null;
let currentItem = null;
let totalPrice = null;

createModal(document.body);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalOverlay.classList.contains("hidden")) {
    closeModal();
  }
});

function createModal(parent) {
  modalOverlay = createElement({
    cssClasses: ["modal-overlay", "hidden"],
    parent,
    events: {
      click: (e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      },
    },
  });
  return modalOverlay;
}

function updateModal(item, parent) {
  currentItem = structuredClone(item);

  let modalContent = createElement({
    cssClasses: ["modal-content"],
    parent: parent,
  });

  let imageContainer = createElement({
    cssClasses: ["modal-image-container"],
    parent: modalContent,
  });

  createElement({
    tag: "img",
    attributes: {
      id: "modal-img",
      src: currentItem.url,
      alt: currentItem.name,
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
    text: currentItem.name,
    parent: modalInfo,
  });

  createElement({
    tag: "p",
    cssClasses: ["modal-description"],
    text: currentItem.description,
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

  createSizeBlock(sizeOptions);

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

  createAdditives(additivesOptions);

  let modalTotal = createElement({
    cssClasses: ["modal-total"],
    parent: modalInfo,
  });

  createElement({
    tag: "span",
    text: "Total:",
    parent: modalTotal,
  });

  totalPrice = createElement({
    tag: "span",
    attributes: { id: "modal-total-price" },
    text: currentItem.price,
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
    events: { click: closeModal },
  });

  modalOverlay.replaceChildren(modalContent);

  calculateTotal();
}

function createAdditives(parent) {
  currentItem.additives.forEach((data, index) => {
    let btn = createElement({
      tag: "button",
      cssClasses: ["button", "param-btn"],
      attributes: { type: "button" },
      parent: parent,
      events: {
        click: () => {
          data.selected = !data.selected;
          btn.classList.toggle("active");
          calculateTotal();
        },
      },
    });

    createElement({
      tag: "span",
      cssClasses: ["icon-circle"],
      text: index + 1,
      parent: btn,
    });

    createElement({
      tag: "span",
      text: data.name,
      parent: btn,
    });
  });
}

function createSizeBlock(parent) {
  const sizeButtons = [];
  Object.entries(currentItem.sizes).forEach(([key, data]) => {
    let btnClasses = ["button", "param-btn"];
    if (data.selected) btnClasses.push("active");

    let btn = createElement({
      tag: "button",
      cssClasses: btnClasses,
      attributes: { type: "button" },
      parent: parent,
      events: {
        click: () => {
          Object.values(currentItem.sizes).forEach((s) => (s.selected = false));
          data.selected = true;
          sizeButtons.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          calculateTotal();
        },
      },
    });

    sizeButtons.push(btn);

    createElement({
      tag: "span",
      cssClasses: ["icon-circle"],
      text: key.toUpperCase(),
      parent: btn,
    });

    createElement({
      tag: "span",
      text: data.size,
      parent: btn,
    });
  });
}

function showModal() {
  modalOverlay.classList.remove("hidden");
  document.body.classList.add("lock");
}

function closeModal() {
  modalOverlay.classList.add("hidden");
  document.body.classList.remove("lock");
}

function calculateTotal() {
  let total = parseFloat(currentItem.price);

  const selectedSize = Object.values(currentItem.sizes).find(
    (size) => size.selected,
  );

  if (selectedSize) {
    total += parseFloat(selectedSize["add-price"]);
  }

  currentItem.additives.forEach((additive) => {
    if (additive.selected) {
      total += parseFloat(additive["add-price"]);
    }
  });

  if (totalPrice) {
    totalPrice.textContent = total.toFixed(2);
  }
}

export { createModal, updateModal, showModal };
