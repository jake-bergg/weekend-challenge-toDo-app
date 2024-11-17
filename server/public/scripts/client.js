// const { get } = require("../../routes/todos.router")

function onReady(){
    console.log('onReady() called!')

    // ! GET function will go here
    getList()

}

// !!! GOTTA CALL ONREADY IF YOU WANT IT TO LOAD 
onReady()


// ! GET function
function getList() {
    console.log('in getList()...')

    // ! axios to get from server
    axios({
        method: 'GET',
        url: '/todo'
    })
    .then((response) => {
        console.log('got list: ', response.data)
        // ! render function to put list onto DOM
        renderList(response.data)
    })
    .catch((error) => {
        console.log('ERROR in GET list...', error)
        alert(error)
    })
}

// ! POST function
function addToList(event) {
    event.preventDefault()
    console.log('in addToList()...')

    const listToSend = 
    {
        text: document.getElementById("TODO").value,
        isComplete: false
    }

    console.log('adding list: ', listToSend)

    axios({
        method: 'POST',
        url: '/todo',
        data: listToSend
    })
    .then((response) => {
        console.log('posting data: ', response.data)
        document.getElementById("TODO").value = ''
        getList()
    })
    .catch((error) => {
        console.log('ERROR in POST /todo', error)
        alert(error)
    })

}

// ! DELETE function
function deleteTodo(todoId){
    console.log('in deleteTodo(), ', todoId)
    const confirmDelete = confirm('Are you sure you want to remove this item?')
    // if (confirmDelete){
        const itemToRemove = {id: todoId}

        axios ({
            method: 'DELETE',
            url: '/todo',
            data: itemToRemove
        })
        .then ((response) => {
            console.log('DELETE request received: ', response. data)
            getList()
        })
        .catch ((error) => {
            console.log('ERROR in DELETE /todo: ', error)
            alert(error)
        })
    // }
}


// ! PUT function
function updateList(todoId, complete){
    console.log('in updateList(): ', todoId, complete)
    const itemToSend = {
        id: todoId, 
        isComplete: !complete
    }
    // let newCompleteStatus
    // if(complete){
    //     itemToSend.isComplete = false
    // }
    // else{
    //     itemToSend.isComplete = true
    // }

    axios({
        method: 'PUT',
        url: '/todo',
        data: itemToSend
    })
    .then((response) => {
        console.log('sending PUT data: ', itemToSend)
        console.log('PUT request received: ', response.data)
        getList()
    })
    .catch((error) => {
        console.log('ERROR in PUT /todo: ', error)
        alert(error)
    })

}


    

// ! RENDER function
function renderList(list) {
    console.log('renderList() called...')

    const toDo = document.getElementById("toDoList")

    let rows = ''

    for (item of list){
        rows += `
        <tr data-testid="toDoItem" class="${item.isComplete ? 'completed' : ''}">
            <td>${item.text}</td>
            <td>
                <button onClick="updateList(${item.id}, ${item.isComplete})" data-testid="completeButton">✅</button>
            </td><td>
                <button onClick="deleteTodo(${item.id})" data-testid="deleteButton">❌</button>
            </td>
        </tr>
        `
    }
    toDo.innerHTML = rows
}

