/*---------- Cache HTML elements ----------*/
const ingtContainerEl = document.querySelector('.ingredients-container');
const addIngtBtn = document.querySelector('.add-ingt-btn');
const removeIngtBtn = document.querySelector('.remove-ingt-btn');
const addQtyInput = document.querySelector('.add-qty');
const selectIngtEl = document.querySelector('.select-ingt');
const whiteSpaceEl = document.querySelector('.white-space');
const ingtBatchEl = document.querySelector('.ingt-batch');
const addIngtForProdBtn = document.querySelector('.add-ingt-for-prod-btn');

/*---------- Event listeners ----------*/
addIngtForProdBtn.addEventListener('click', addIngtForProd);
document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-ingt-btn')) {
        removeIngt(event.target);
    }
});

/*---------- Functions ----------*/
function removeIngt(event) {
    console.log('deleting...');
    const ingredientInfo = event.closest('.ingt-info');
    ingredientInfo.remove();
    console.log('... deleted');
}

function addIngtForProd() {
    const newIngtInfo = document.createElement('div');
    newIngtInfo.classList.add('ingt-info');
    const whiteSpaceClone = whiteSpaceEl.cloneNode(true);
    const selectIngtClone = selectIngtEl.cloneNode(true);
    const ingtBatchClone = ingtBatchEl.cloneNode(true);
    const addQtyInputClone = addQtyInput.cloneNode(true);
    addQtyInputClone.value = '';
    const removeIngtBtnClone = removeIngtBtn.cloneNode(true);
    newIngtInfo.appendChild(whiteSpaceClone);
    newIngtInfo.appendChild(selectIngtClone);
    newIngtInfo.appendChild(ingtBatchClone);
    newIngtInfo.appendChild(addQtyInputClone);
    newIngtInfo.appendChild(removeIngtBtnClone);
    ingtContainerEl.appendChild(newIngtInfo);
}
