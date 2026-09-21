const themeToggleBtn = document.getElementById("theme-toggle");
const rootElement = document.documentElement;

setInitialTheme();

themeToggleBtn.addEventListener("click", () => {
  const currentTheme = rootElement.getAttribute("data-theme");

  const newTheme = currentTheme === "light" ? "dark" : "light";

  rootElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("dr-theme", newTheme);
});

function setInitialTheme() {
  const savedTheme = localStorage.getItem("dr-theme");
  const initialTheme = savedTheme || "light";
  if (initialTheme === "dark") {
    themeToggleBtn.checked = true;
  }

  rootElement.setAttribute("data-theme", initialTheme);
}
