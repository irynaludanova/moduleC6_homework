const j_width = document.querySelector("#j-width");
const j_height = document.querySelector("#j-height");
const btn = document.querySelector(".j-btn-test");

btn.addEventListener("click", () => {
  let j_width = screen.width;
  let j_height = screen.height;
  alert(`Ширина экрана: ${j_width} px\n высота экрана: ${j_height} px `);
});
