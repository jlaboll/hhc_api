const db = require('./db_pool');

const hedgehogs = [
    {
        name: "Desmond"
    },
    {
        name: "Dorito"
    },
    {
        name: "Cheeto"
    },
    {
        name: "Penelope"
    }
];

const getAllHedgehogs = async (request, response) => {
    db.hhc_db.query('SELECT * FROM test.hedgehog ORDER BY id', (error, results) => {
        db.log(error);
        response.status(200).json(results.rows);
    });
};

const getHedgehogById = async (request, response) => {
    const id = parseInt(request.params.id);
    db.hhc_db.query('SELECT * FROM test.hedgehogs WHERE id = $1', [id], (error, results) => {
        db.log(error);
        response.status(200).json(results.rows);
    });
};

const addHedgehog = async (request, response) => {
    const {id, name} = request.body;
    db.hhc_db.query('INSERT INTO test.hedgehog (id, name) VALUES ($1, $2)', [id, name], (error, results) => {
        db.log(error);
        if (error) {
            response.status(200).send(`Error adding hedgehog.`);
        } else {
            response.status(200).send(`Hedgehog was added.`);
        }
    });
};

const updateHedgehog = async (request, response) => {
    const id = parseInt(request.params.id);
    const {name} = request.body;
    db.hhc_db.query('UPDATE test.hedgehog SET name=$1 WHERE id=$2', [name, id], (error, results) => {
        db.log(error);
        response.status(200).send(`Hedgehog was updated.`);
    });
};

const deleteHedgehog = async (request, response) => {
    const id = parseInt(request.params.id);
    db.hhc_db.query('DELETE FROM test.hedgehog WHERE id=$1', [id], (error, results) => {
        db.log(error);
        response.status(200).send(`Hedgehog was deleted.`);
    });
};

module.exports = {
    getAllHedgehogs,
    getHedgehogById,
    addHedgehog,
    updateHedgehog,
    deleteHedgehog
};