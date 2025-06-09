import './js/sound-wave-api.js'
import './js/render-functions.js'
import './js/menu.js'
import './js/modal.js'


import { createFooter } from "./js/footer.js";

const root = document.getElementById("root");
if (!root) {
  console.error("❌ Елемент #root не знайдено у index.html");
  // альтернатива: const root = document.body;
}

root.append(createFooter());