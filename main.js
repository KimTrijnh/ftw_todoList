let addBtn = document.getElementById('addBtn');
let todoInput = document.getElementById('todoInput');
let todoList = document.getElementById('todoList');
let progressList = document.getElementById('progressList');
let doneList = document.getElementById('doneList');
let checkbox = document.getElementById('checkbox');
let resetBtn = document.getElementById('restBtn');


let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));


let addTodo = () => {
    //if using let to decalere a function, have to declare before it is called/evolved. 
    //If using function addTodo(), it can be called anywhere
    itemsArray.push({
        text: todoInput.value,
        isDone: false
    });
    localStorage.setItem('items', JSON.stringify(itemsArray));
    todoInput.value = '';
}


let updateTodoList = (arr) => {
    let html = '';
    let status = '';
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].isDone === false) {
            status = 'Mark Done';
            html += `<li>${arr[i].text} <a href="#" onclick="remove(${i})">x</a> <a href="#" onclick="toggleDone(${i})">${status}</a></li>`;
        }
        if (arr[i].isDone === true) {
            status = 'Mark unDone';
            html += `<li><strike>${arr[i].text} </strike> <a href="#" onclick="remove(${i})">x</a> <a href="#" onclick="toggleDone(${i})">${status}</a></li>`;
        }        
    }
    localStorage.setItem('items', JSON.stringify(itemsArray));
    todoList.innerHTML = html;
}

updateTodoList(data);

let render = () => {
    //to render updateTodolist with argument to addeventListener 
    updateTodoList(itemsArray);
}

let remove = (i) => {
    itemsArray.splice(i, 1);
    updateTodoList(itemsArray);
    localStorage.setItem('items', JSON.stringify(itemsArray));

}

let toggleDone = (i) => {
    itemsArray[i].isDone = !itemsArray[i].isDone;
    updateTodoList(itemsArray);
    localStorage.setItem('items', JSON.stringify(itemsArray));

}


let toggleFilter = () => {
if(checkbox.checked) { 
    updateTodoList(itemsArray.filter( i => i.isDone === false));
}
else{ 
    updateTodoList(itemsArray);
}
}

checkbox.addEventListener('change', toggleFilter)
addBtn.addEventListener('click', addTodo);
addBtn.addEventListener('click', render);




