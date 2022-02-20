const db = require("./db_pool");
const auth = require('basic-auth');
const {user, password} = require("pg");
const authTokens = {};

const loginMiddleware = async (request, response, next) => {
    const authorized = auth(request);

    if (!authorized) {
        return unauthorized();
    }

    request.auth = {
        user: authorized.name,
        password: authorized.pass
    }

    return authorizer(authorized.name, authorized.pass)


    async function authorizer(user, password) {
        let authenticated = false;
        await db.hhc_db.query('SELECT TRUE AS user_auth FROM system.user WHERE email = $1 AND password = $2',
            [user, password],
            (error, {rows}) => {
                db.log(error);
                if (rows) {
                    authenticated = rows;
                }
                if (authenticated === false) {
                    return unauthorized(user, password);
                }
                return next();
            });
    }

    function unauthorized(user, password) {
        return response.status(401).send('Bad login. Got ' + user + ' ' + password);
    }
};

module.exports = {
    loginMiddleware
}