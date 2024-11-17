const router = require('express').Router();
const pool = require('../modules/pool');
const pg = require('pg')

router.get('/', (req, res) => {
    // ! Query text for what we want to do in the DB
    let queryText = `SELECT * FROM "todos";` // * Dont forget the semicolon

    // ! Request to the DB
    pool.query(queryText)
        .then((result) => {
            console.log("Result from DB: ", result)
            res.send(result.rows)
        })
        .catch((error) => {
            console.log(`Error making query: ${queryText} -`, error)
            res.sendStatus(500)
        })
});

router.post('/', (req, res) => {
    console.log('req.body', req.body);
    const newToDo = req.body

    const queryText = `
        INSERT INTO "todos"("text", "isComplete") 
        VALUES ($1, $2);
    `
    const values = [newToDo.text, newToDo.isComplete]

    pool.query(queryText, values)
        .then((result) => {
            res.sendStatus(201)
        })
        .catch((error) => {
            console.log(`Error making query: ${queryText} -`, error)
            res.sendStatus(500)
        })
});


router.delete( '/', ( req, res )=>{
    // ! assemble query
    const queryText = `DELETE FROM todos WHERE id=$1;`
    const values = [ req.body.id ]
    // ! run pool.query
    pool.query( queryText, values )
    .then( ( results )=>{
        res.sendStatus( 200 ) // * "OK"
    }).catch( ( err )=>{
        // ! handle any errors
        console.log( err )
        res.sendStatus( 400 )
    })
  })
  

router.put('/', (req, res) => {
    console.log('item to PUT: ', req.body)
    const queryText = `UPDATE "todos" SET "isComplete"=$1 WHERE "id"=$2`
    const values = [req.body.isComplete, req.body.id]

    pool.query( queryText, values ).then( ( results )=>{
        res.sendStatus( 200 ); // "OK"
    }).catch( ( err )=>{
        // handle any errors
        console.log( err );
        res.sendStatus( 400 );
    })
})


module.exports = router;
