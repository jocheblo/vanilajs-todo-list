"use strict"

//constructor fuction
function TodoList() {

    const status = {

    }

    this.todoListElems = [];

    //methods
    this.addNewTodo = (name, status, elemAdded) => {
        //add new todo to list
        let todoObjc = {
            name: name,
            status: status
        }

        this.todoListElems.push(todoObjc);
        //callback
        elemAdded();

    }

    this.marcTodoAsDone = (elem) => {
        //mark todo as done
        this.todoListElems[elem].status = 'done';
    }
    this.deleteTodo = (elem, elemAdded) => {
        //delete todo from list
        this.todoListElems.splice(elem, 1);
        //callback
        elemAdded();

    }
    this.clearAllTodos = (elemAdded) => {
        //clear all todos from list
        this.todoListElems = [];
        //callback
        elemAdded();
    }
}

//let's start with the                                                                                                                                                                                                                                                                                     action!!!
const todoList = new TodoList;

const todoInput = document.querySelector('.todoapp__input');
const todoUl = document.querySelector('.todoapp__ul');
const todoClearAll = document.querySelector('.todoapp__btn');


//insert elemen to list on enter
todoInput.addEventListener('keydown', (e) => {
    if(e.target.value !== '') {
        if(e.keyCode === 13) {
            todoList.addNewTodo(e.target.value, 'undone', elemAdded);
        }
    }

    
});

//clear all 
todoClearAll.addEventListener('click', () => {
    todoList.clearAllTodos(elemAdded);
    todoClearAll.style.display = "none";
})


const elemAdded = () => {
    //clean list
    todoUl.innerHTML = '';
    //show elements on list
    todoList.todoListElems.forEach( (todo, index) => {
        //create list elem
        let listElem = document.createElement("li");
        //add clas to list elem
        listElem.classList.add("todoapp__ul__li");
        //insert name in li
        listElem.appendChild(document.createTextNode(todo.name));
        //create delete  btn elem
        let btnElem = document.createElement("button");
        //add clas to btn elem
        btnElem.classList.add("todoapp__ul__li__btn", "delete__btn");   
        //insert name in btn
        btnElem.appendChild(document.createTextNode('Delete'));     
        //insert li elem inside ul
        todoUl.appendChild(listElem);
        //insert btn elem inside li
        listElem.appendChild(btnElem);
        //clear input
        todoInput.value = '';

        btnElem.addEventListener('click', () => {
            //delete list
            todoList.deleteTodo(index, elemAdded);
        });

        //mark as done
        listElem.addEventListener('click', (e) => {
            todoList.marcTodoAsDone(index);
            e.target.style.textDecoration = "line-through";
            e.target.style.color = "#33cc00";
        });

        //keep done tasks
        if(todo.status === 'done') {
           listElem.style.textDecoration = "line-through";
           listElem.style.color = "#33cc00";
        }

        if(todoList.todoListElems.length > 1) {
            todoClearAll.style.display = "block";
        } else {
            todoClearAll.style.display = "none";
        }
        
    });
}