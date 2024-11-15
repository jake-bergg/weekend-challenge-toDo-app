const { get } = require("../../routes/todos.router")

function onReady(){
    console.log('onReady() called!')

    // ! GET function will go here

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
function addToList() {
    console.log('')
}
