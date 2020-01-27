const url = require('url');
const {getLoggedUser} = require("./apiusers");
let msgs =  new Array();

exports.apiChat = function(req, res){
    res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin":"*"});
    let q = url.parse(req.url, true);
    if (q.pathname == "/chat/listmsgs"){
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        let loggedUser = getLoggedUser(req.parameters.token);
        if (loggedUser) {
            obj.messages = msgs;
        } else {
        obj.error = "Už to zase zkoušís? Fakt? Musíš se přihlásit dpc!!!!!!!!!!";
        }
        res.end(JSON.stringify(obj));
    }
    else if (q.pathname == "/chat/addmsg") {
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.text = q.query["msg"];
        obj.prezdivka = q.query["nick"];
        obj.time = new Date();
        msgs.push(obj);
        res.end(JSON.stringify(obj));
    }
}