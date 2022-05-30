const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
  alert(`Размеры вашего экрана: ${window.screen.width} x ${window.screen.height}`);
});