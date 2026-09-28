import createElement from "./utils/create-element.js";

let modalOverlay;

createModal(document.body);

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

  Object.entries(item.sizes).forEach(([key, data]) => {
    let btnClasses = ["button", "param-btn"];
    if (data.selected) btnClasses.push("active");

    let btn = createElement({
      tag: "button",
      cssClasses: btnClasses,
      attributes: { type: "button" },
      parent: sizeOptions,
    });

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

  item.additives.forEach((data, index) => {
    let btn = createElement({
      tag: "button",
      cssClasses: ["button", "param-btn"],
      attributes: { type: "button" },
      parent: additivesOptions,
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
    events: { click: closeModal },
  });

  modalOverlay.replaceChildren(modalContent);
}

function showModal() {
  modalOverlay.classList.remove("hidden");
  document.body.classList.add("lock");
}

function closeModal() {
  modalOverlay.classList.add("hidden");
  document.body.classList.remove("lock");
}

export { createModal, updateModal, showModal };
