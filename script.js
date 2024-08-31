function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".about-pic");
  for (let i = 1; i < slides.length; i++) {
    slides[i].style.display = "none"; 
  }

  let currentSlide = 0;

  function showSlide(n) {
    slides[currentSlide].style.display = "none";
    currentSlide = (currentSlide + n + slides.length) % slides.length;
    slides[currentSlide].style.display = "block";
  }

  function nextSlide() {
    showSlide(1);
  }

  setInterval(nextSlide, 2000);
});
