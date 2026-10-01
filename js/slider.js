const slides = document.querySelectorAll(".slide");
const slidesContainer = document.querySelector(".slides-container");
const leftArrow = document.querySelector(".left_arrow");
const rightArrow = document.querySelector(".right_arrow");
let currentSlide = 0;
let isEnabled = true;

function changeSlide(n) {
  currentSlide = (n + slides.length) % slides.length;
}

function hideSlide(direction) {
  isEnabled = false;
  slides[currentSlide].classList.add(direction);
  slides[currentSlide].addEventListener("animationend", function () {
    this.classList.remove("active", direction);
  });
}

function showSlide(direction) {
  slides[currentSlide].classList.add("next", direction);
  slides[currentSlide].addEventListener("animationend", function () {
    this.classList.remove("next", direction);
    this.classList.add("active");
    isEnabled = true;
  });
}

function prevSlide(n) {
  hideSlide("to_right");
  changeSlide(n - 1);
  showSlide("from_left");
  setActiveControl(n - 1);
}

function nextSlide(n) {
  hideSlide("to_left");
  changeSlide(n + 1);
  showSlide("from_right");
  setActiveControl(n);
}

leftArrow.addEventListener("click", function () {
  if (isEnabled) {
    prevSlide(currentSlide);
  }
});

rightArrow.addEventListener("click", function () {
  if (isEnabled) {
    nextSlide(currentSlide);
  }
});

const controls = document.querySelectorAll(".control");
function setActiveControl(n) {
  controls.forEach((control) => control.classList.remove("active"));
  controls[currentSlide].classList.add("active");
}

controls.forEach((control) =>
  control.addEventListener("animationend", () => {
    if (isEnabled) {
      nextSlide(currentSlide);
    }
  }),
);

document
  .querySelector(".slides-container")
  .addEventListener("mouseover", () => {
    document.querySelector(".control.active").style.animationPlayState =
      "paused";
  });

document.querySelector(".slides-container").addEventListener("mouseout", () => {
  document.querySelector(".control.active").style.animationPlayState =
    "running";
});

document
  .querySelector(".slides-container")
  .addEventListener("touchstart", () => {
    document.querySelector(".control.active").style.animationPlayState =
      "paused";
  });

document.querySelector(".slides-container").addEventListener("touchend", () => {
  document.querySelector(".control.active").style.animationPlayState =
    "running";
});

const swipe = (element) => {
  let area = element;

  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;

  let startTime = 0;
  let swipedTime = 0;

  let allowedX = 100;
  let allowedY = 100;
  let allowedTime = 500;

  area.addEventListener("mousedown", function (e) {
    startTime = new Date().getTime();
    startX = e.pageX;
    startY = e.pageY;
    e.preventDefault();
  });

  area.addEventListener("mouseup", function (e) {
    swipedTime = new Date().getTime() - startTime;
    distX = e.pageX - startX;
    distY = e.pageY - startY;

    if (swipedTime <= allowedTime) {
      if (Math.abs(distX) >= allowedX && Math.abs(distY) <= allowedY) {
        if (distX > 0) {
          if (isEnabled) {
            prevSlide(currentSlide);
          }
        } else {
          if (isEnabled) {
            nextSlide(currentSlide);
          }
        }
      }
    }
    e.preventDefault();
  });

  area.addEventListener("touchstart", function (e) {
    let touch = e.changedTouches[0];
    startTime = new Date().getTime();
    startX = touch.pageX;
    startY = touch.pageY;
    e.preventDefault();
  });

  area.addEventListener("touchmove", function (e) {
    e.preventDefault();
  });
  area.addEventListener("touchend", function (e) {
    let touch = e.changedTouches[0];
    swipedTime = new Date().getTime() - startTime;
    distX = touch.pageX - startX;
    distY = touch.pageY - startY;

    if (swipedTime <= allowedTime) {
      if (Math.abs(distX) >= allowedX && Math.abs(distY) <= allowedY) {
        if (distX > 0) {
          if (isEnabled) {
            prevSlide(currentSlide);
          }
        } else {
          if (isEnabled) {
            nextSlide(currentSlide);
          }
        }
      }
    }

    e.preventDefault();
  });
};

swipe(slidesContainer);
