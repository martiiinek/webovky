const url = require('url');
const fs = require("fs");
const crypto = require("crypto");

let users = new Array();
if (fs.existsSync("users.json")) {
    users = JSON.parse(fs.readFileSync("users.json"));
}
let loggedUsers = new Array();

    function zamixujHeslo(pw) {
        let salt = pw.split("").reverse().join("");
        let mixPw = crypto.createHmac("sha256", salt).update(pw).digest("hex");
        return mixPw;
    }

exports.apiUsers = function (req, res) {
    if (req.pathname.endsWith("/list")) {
        res.writeHead(200, {
            "Content-type": "application/json"
        });
        let obj = {};
        obj.users = users;
        res.end(JSON.stringify(obj));
    } else if (req.pathname.endsWith("/add")) {
        res.writeHead(200, {
            "Content-type": "application/json"
        });
        let obj = {};
        obj.login = req.parameters.login;
        let userExists = false;
        for (let u of users) {
            if (u.login === obj.login) {
                userExists = true;
                break;
            }
        }
        if (userExists) {
            obj.error = "Sory bráško, to asi nepůjde"
        } else {
            obj.name = req.parameters.name;
            obj.password = zamixujHeslo(req.parameters.password);
            obj.email = req.parameters.email;
            users.push(obj);
            fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
        }
        res.end(JSON.stringify(obj));
    } else if (req.pathname.endsWith("/login")) {
            res.writeHead(200, {
                "Content-type": "application/json"
            });
            let obj = {};
            let login = req.parameters.login;
            let found = false;
            obj.error = "Seš si jistej? Něco tam máš asi špatně, bráško :-(";
            for (let u of users) {
                if (u.login === login) {
                    found = true;
                    if (u.password === zamixujHeslo(req.parameters.password)) {
                        obj.name = u.name;
                        obj.error = null; //undefined
                        let token = crypto.randomBytes(16).toString('hex'); //32 nahodnych znaku
                        obj.token = token;
                        let objLoggedUsers = {};
                        objLoggedUsers.name = u.name;
                        loggedUsers[token] = objLoggedUsers; // natvrdo nastavim index nove polozky na hodnotu tokenu
                    }
                    break; //vyskoceni z cyklu
                }
            }

            res.end(JSON.stringify(obj));

    }
};

    exports.getLoggedUser = function (token) {
        let u = loggedUsers[token];
        return u;
    }