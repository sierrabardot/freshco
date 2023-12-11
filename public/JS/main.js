/*---------- Cache HTML elements ----------*/
const ingtContainerEl = document.querySelector('.ingredients-container');
const addIngredientBtn = document.querySelector('.add-ingt-btn');
const methodContainerEl = document.querySelector('.method-container');
const addStepBtn = document.querySelector('.add-step-btn');
const removeIngtBtn = document.querySelector('.remove-ingt-btn');
const removeStepBtn = document.querySelector('.remove-step-btn');
const methodInput = document.querySelector('.method-input');
const ingtOptions = document.querySelector('.ingt-options');
const addQtyInput = document.querySelector('.add-qty');
const selectIngtEl = document.querySelector('.select-ingt');

/*---------- Event listeners ----------*/
addIngredientBtn.addEventListener('click', addIngredient);
addStepBtn.addEventListener('click', addStep);
document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-ingt-btn')) {
        removeIngredient(event.target);
    } else if (event.target.classList.contains('remove-step-btn')) {
        removeStep(event.target);
    }
});

/*---------- Functions ----------*/
function removeIngredient(btn) {
    const ingredientInfo = btn.closest('.ingt-info');
    ingredientInfo.remove();
}

function removeStep(btn) {
    const methodStep = btn.closest('.method-step');
    methodStep.remove();
}

function addStep() {
    const newMethodStep = document.createElement('div');
    newMethodStep.classList.add('method-step');
    const methodInputClone = methodInput.cloneNode(true);
    methodInputClone.value = '';
    const removeStepBtnClone = removeStepBtn.cloneNode(true);
    newMethodStep.appendChild(methodInputClone);
    newMethodStep.appendChild(removeStepBtnClone);
    methodContainerEl.appendChild(newMethodStep);
}

function addIngredient() {
    const newIngtInfo = document.createElement('div');
    newIngtInfo.classList.add('ingt-info');
    const selectIngtClone = selectIngtEl.cloneNode(true);
    const addQtyInputClone = addQtyInput.cloneNode(true);
    addQtyInputClone.value = '';
    const removeIngtBtnClone = removeIngtBtn.cloneNode(true);
    newIngtInfo.appendChild(selectIngtClone);
    newIngtInfo.appendChild(addQtyInputClone);
    newIngtInfo.appendChild(removeIngtBtnClone);
    ingtContainerEl.appendChild(newIngtInfo);
}
