const themeToggleBtn = document.getElementById("theme-toggle");
const rootElement = document.documentElement;

setInitialTheme();

function setInitialTheme() {
  const savedTheme = localStorage.getItem("dr-theme");
  const initialTheme = savedTheme || "light";
  if (initialTheme === "dark") {
    themeToggleBtn.checked = true;
  }

  rootElement.setAttribute("data-theme", initialTheme);
}
