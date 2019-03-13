let input = document.getElementById('input');
let addBtn = document.getElementById('addBtn');
let todoList = document.getElementById('todoList');
let checkbox = document.getElementById('checkbox');
let clearBtn = document.getElementById('clearBtn');

//let itemsArray = [];

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));

let addItem = () => {
    let html = '';
    //push items to itemsArray
    itemsArray.push({
        text: input.value,
        isDone: false,
            });
    //check if checked and update todolist
    localStorage.setItem('items', JSON.stringify(itemsArray));
    toggleChecked();
   

    //clear input value
    input.value = '';
}


let updateTodoList = (arr) => {
    let html = '';

    arr.map((i) => {
        //define status
        if (i.isDone === false) {//if undone, no strike
            
            html += `<li>${i.text} <span class="badge badge-secondary" onclick="remove(${arr.indexOf(i)})">Remove</span>  <span class="badge badge-warning marked" onclick="toggleStatus(${arr.indexOf(i)})">Undone</span></li> `;

        } 
        if(i.isDone === true ) {//if done, strike and change status
            
            html += `<li><strike>${i.text} </strike><span class="badge badge-secondary" onclick="remove(${arr.indexOf(i)})">Remove</span>  <span class="badge badge-warning marked" onclick="toggleStatus(${arr.indexOf(i)})">Done</span></li> `;
        }
    })

    localStorage.setItem('items', JSON.stringify(itemsArray));
    //print texts of itemsArray to html

    todoList.innerHTML = html;
}

let remove = (i) => {
    //remove this item from itemsArray    
    itemsArray.splice(i, 1);
    //update todoList
    updateTodoList(itemsArray);
    localStorage.setItem('items', JSON.stringify(itemsArray));

}

let toggleStatus = (i) => {
    //change the isDone value true <->false
    itemsArray[i].isDone = !itemsArray[i].isDone;
    updateTodoList(itemsArray);    
    //update to do list
    toggleChecked();
    localStorage.setItem('items', JSON.stringify(itemsArray));

}

let toggleChecked = () => { 
    if(checkbox.checked) { updateTodoList(itemsArray.filter( i => i.isDone === false)) }
    if(!checkbox.checked) { updateTodoList(itemsArray)}
    //localStorage.setItem('items', JSON.stringify(itemsArray));

    
}

addBtn.addEventListener('click', addItem);
checkbox.addEventListener('change', toggleChecked);
clearBtn.addEventListener('click', clearAll)

function clearAll () {
localStorage.clear();
updateTodoList([]);
itemsArray = [];
}

function render() {
     toggleChecked();

}
render();