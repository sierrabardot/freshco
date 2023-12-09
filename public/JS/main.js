/*---------- Cache HTML elements ----------*/
const ingtContainerEl = document.querySelector('.ingredients-container');
const ingtInfoEl = document.querySelector('.ingt-info');
const addIngredientBtn = document.querySelector('.add-ingt-btn');
const methodContainerEl = document.querySelector('.method-container');
const methodStepEl = document.querySelector('.method-step');
const addStepBtn = document.querySelector('.add-step-btn');

/*---------- Event listeners ----------*/
addIngredientBtn.addEventListener('click', addIngredient);
addStepBtn.addEventListener('click', addStep);

/*---------- Functions ----------*/
function addStep() {
    const clone = methodStepEl.cloneNode(true);
    methodContainerEl.appendChild(clone);
}

function addIngredient() {
    const clone = ingtInfoEl.cloneNode(true);
    ingtContainerEl.appendChild(clone);
}
