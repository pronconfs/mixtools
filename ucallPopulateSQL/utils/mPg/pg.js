/**
 * Class to access the postgresql database define in the /config/settings.json file
 */

const mSettings = require('../../settings.json').postgresql.production,
    {Client} = require('pg'),
    Promise = require("bluebird");

/**
 * Implementation of a class with all the required methods to access the postgresql database
 * @type {{query}}
 */
module.exports = (() => {

    /**
     * Returns a promise for the result of the given query.
     * @param {text, values} oQuery
     * @returns {Promise.<TResult>}
     */
    function fnQuery(oQuery) {

        return new Promise((resolve, reject) => {
            const client = new Client({
                user: mSettings.username,
                host: mSettings.host,
                database: mSettings.database,
                password: mSettings.password,
                port: mSettings.port
            });

            client.connect();

            client.query(oQuery, (err, result) => {
                client.end();
                if (err) return reject(err);
                return resolve(result.rows);
            });

        });
    }

    return {
        query: fnQuery
    };
})();