// const { get } = require("../../routes/todos.router")

function onReady(){
    console.log('onReady() called!')

    // ! GET function will go here
    getList()

}


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

    document.getElementById("TODO").value = ''

    axios({
        method: 'POST',
        url: '/todo',
        data: listToSend
    })
    .then((response) => {
        console.log('posting data: ', response.data)
        getList()
    })
    .catch((error) => {
        console.log('ERROR in POST /todo', error)
        error.sendStatus(500)
    })

}

    

// ! RENDER function
function renderList(list) {
    console.log('renderList() called...')

    const toDo = document.getElementById("toDoList")

    toDo.innerHTML = ''

    for (item of list){
        toDo.innerHTML += `
        <tr>
            <td>${item.todo}</td>
            <td>
                <button>Complete</button>
            </td><td>
                <button>Delete</button>
            </td>
        </tr>
        `
    }
}

