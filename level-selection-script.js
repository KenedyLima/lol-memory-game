import {
  generateHTMLForDifficultLevel,
  generateHTMLForEasyLevel,
  generateHTMLForMediumLevel,
} from "./script.js";
const levels = document.querySelectorAll(".level");

/*EVENT LISTENERS */

levels.forEach((level) => {
  level.addEventListener("click", function (e) {
    e.preventDefault;

    const dataLevel = e.target.getAttribute("data-level");
    switch (dataLevel) {
      case "easy":
        generateHTMLForEasyLevel();
        break;
      case "medium":
        generateHTMLForMediumLevel();
        break;
      case "difficult":
        generateHTMLForDifficultLevel();
      default:
        break;
    }
  });
});
