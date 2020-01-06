const url = require('url');
let users =  new Array();

exports.apiUsers = function(req, res){
    res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin":"*"});
    let q = url.parse(req.url, true);
    if (q.pathname == "/users/data"){
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.uzivatel = users;
        res.end(JSON.stringify(obj));
    }
    else if (q.pathname == "/users/register") {
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.text = q.query["msg"];
        obj.register = q.query["nick"];
        obj.time = new Date();
        users.push(obj);
        res.end(JSON.stringify(obj));
    }
}