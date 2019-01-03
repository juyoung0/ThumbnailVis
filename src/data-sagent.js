/**
 * Created by juyoung on 2018-08-27.
 */
const request = require('superagent')

const URL = 'http://localhost:3000/fruits.json'
request.get(URL)
    .query(params)
    .end(callbackGet)

function callbackGet (err, res) {
    if (err) {
        return
    }
    console.log(res.body)
}