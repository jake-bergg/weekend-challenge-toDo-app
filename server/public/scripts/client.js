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
        todo: document.getElementById("TODO").value
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

    

// ! RENDER function
function renderList(list) {
    console.log('renderList() called...')

    const toDo = document.getElementById("toDoList")

    let rows = ''

    for (item of list){
        rows += `
        <tr>
            <td data-testid="toDoItem">${item.todo}</td>
            <td>
                <button data-testid="completeButton">Complete</button>
            </td><td>
                <button data-testid="deleteButton">Delete</button>
            </td>
        </tr>
        `
    }
    toDo.innerHTML = rows
}

