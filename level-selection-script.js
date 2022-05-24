const levels = document.querySelectorAll(".level");

levels.forEach((level) => {
  level.addEventListener("click", function (e) {
    e.preventDefault;
    level = e.target.getAttribute("data-level");
    location.replace(`game.html#${level}`);
  });
});
