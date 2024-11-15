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
        todo: document.getElementById("TO-DO").value
    }

    console.log('adding list: ', listToSend)

    axios({
        method: 'POST',
        url: '/todo',
        data: listToSend
    })
    .then((response) => {
        console.log('posting data: ', response.data)
        response.data
    })
    .catch((error) => {
        console.log('ERROR in POST /todo', error)
        error.sendStatus(500)
    })

}

    

// ! RENDER function
function renderList(list) {
    console.log('renderList() called...')

    const toDo = document.getElementById("toDoList").value

    toDo.innerHTML += `
    <tr>
        <td><button onclick="deleteArtist(${ artist.id })">DELETE</button> ${artist.name}</td>
        <td>${artist.birthdate} <button onclick="toggleFavoriteArtist( ${ artist.id }, ${ artist.favorite } )">${ favButton }</button></td>
      </tr>
    `

}

