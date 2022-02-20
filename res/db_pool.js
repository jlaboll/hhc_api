const {Pool, Client} = require('pg');

const hhc_db = new Pool({
    user: 'api_test',
    host: '192.168.88.235',
    database: 'api_test',
    password: 'testing',
    port: 8945,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

const log = (error) => {
    if (error) {
        console.error('PG return: ', error.stack)
    } else {
        console.log('PG connected')
    }
}

module.exports = {
    hhc_db,
    log
};