const btn = document.querySelector(".j-btn-test");
const icon1 = document.querySelector(".btn_icon1");
const icon2 = document.querySelector(".btn_icon2");

btn.addEventListener("click", () => {
  icon1.classList.toggle("btn--magic");
  icon2.classList.toggle("btn--magic");
});
