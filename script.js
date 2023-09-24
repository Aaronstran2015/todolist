const gridContainer = document.querySelector('.grid-container');
const addButton = document.querySelector('#add-button');
let itemIdCounter = 0;
let listArray = [];

loadFromLocalStorage();

addButton.addEventListener("click", createListItem)

function createListItem() {

    const listItem = document.createElement("div");
    const listInput = document.createElement("input");
    const delButton = document.createElement("button");
    const itemId = `list-${itemIdCounter}`;

    // List Item Section
    listItem.id = itemId;
    listItem.classList.add('list-item');
    listArray.push([itemId, ""]);

    // List Input Section
    listInput.classList.add('list-input');

    // Delete button section
    delButton.classList.add('del-button');
    delButton.textContent = "X";
    gridContainer.insertBefore(listItem, addButton);
    listItem.append(listInput);
    listItem.append(delButton);


    delButton.addEventListener("click", () => {
        const itemToRemove = document.getElementById(itemId);
        if (itemToRemove) {
            itemToRemove.remove();
        }
        const index = listArray.findIndex(item => item[0] === itemId);
        if (index !== -1) {
            listArray.splice(index, 1);
            saveToLocalStorage(listArray);
            console.log('Array updated and saved to local storage');
        }
    });

    listInput.addEventListener("change", (event) => {
        const inputParent = event.target.parentElement;
        const index = listArray.findIndex(item => item[0] === inputParent.id);
        if (index !== -1) {
            listArray[index][1] = event.target.value;
            saveToLocalStorage(listArray);
            console.log('Array updated and saved to local storage');
        }
    }); 

    console.log(listArray);
    itemIdCounter++;

}

function saveToLocalStorage(listArray) {
    const listArrayJSON = JSON.stringify(listArray);
    localStorage.setItem('listArray', listArrayJSON);
}

function loadFromLocalStorage() {
    const storedJSONstring = localStorage.getItem('listArray');
    if (storedJSONstring) {
        listArray =  JSON.parse(storedJSONstring);
        console.log("Loaded stored array    " + storedArray);
    }
    else {
        console.log("No items found in local storage")
    }
}

