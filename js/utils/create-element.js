export default function createElement({
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
