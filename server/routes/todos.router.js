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


module.exports = router;
