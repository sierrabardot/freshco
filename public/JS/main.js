const addIngredientBtn = document.querySelector('.add-ingt-btn');
const containerEl = document.querySelector('.ingredients-container');
const selectIngtEl = document.querySelector('.select-ingt');

function addIngredient() {
    console.log(`Adding ingredient...`);
    const newIngredientOptions = document
        .createElement('option')
        .classList.add('ingt-options')
        .setAttribute('name', 'prooduct[]');
    const selectNewIngredient = document
        .createElement('select')
        .classList.add('select-ingt')
        .setAttribute('name', 'ingredient')
        .appendChild(newIngredientOptions);
    // newIngredient.innerHTML = selectIngtEl.innerHTML;
    containerEl.appendChild(selectNewIngredient);
    console.log(`Ingredient added: ${newIngredient}`);
}

// create new .select-ingt element and append to .ingredients-container
// create new .ingt-options element and append to .select-ingt
// create new .add-qty element and append to .ingredients-container

// create new .add-ingt-button and append to .ingredients-container
// remove add-ingt-btn

addIngredientBtn.addEventListener('click', addIngredient);
