const pool = require('./config')

function query(sql, arr) {
    return new Promise((resolve, reject) => {
        if (!sql || !arr) {
            return resolve("No sql provided")
        }
        pool.query(sql, arr, (err, result) => {
            if (err) {
                console.log("err::",err)
                return reject(err)
            } else {
                return resolve(result.rows)
            }
        })
    })
}

exports.query = query   
