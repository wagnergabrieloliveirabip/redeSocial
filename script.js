document.addEventListener("DOMContentLoaded", ()=>{
const likeBtn = document.querySelector(".left-actions .action-btn:first-child");
if (!likeBtn) return;

const likeSvg =likeBtn.querySelector("svg");

// contador
let textNode = Array.from(likeBtn.childNodes). find(
(node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !==
);

//Zerando o contador inicial
let count = 0;

// Atializa
if (textNode){
textNode.textContent = ` 0`;
}







})