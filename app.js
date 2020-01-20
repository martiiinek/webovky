const http = require("http");
const createSpaServer = require("spaserver").createSpaServer;
const dateFormat = require("dateformat");
const fs = require('fs');
const url = require('url');
const uniqid = require("uniqid")
const apiDenVTydnu = require('./apiDenVTydnu').apiDenVTydnu;
const apiSvatky = require('./apiSvatky').apiSvatky;
const apiChat = require('./apichat').apiChat;
const apiUsers = require('./apiusers').apiUsers;
const apicislo = require('./apiCislo').apicislo;

let citac = 0;
let druhejcitac = 0;
let mereni = new Array();
let PORT = 8080;
let msgs =  new Array();

function processApi(req, res) {
    if (req.pathname == "/jinastranka") {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset = 'UTF8'></head><body>objevils super tajnou wwebku kamo</body></html>");
    } else if (req.pathname == "/cislo") {
        apicislo(req, res);
    }
    else if (req.pathname == "/jsondemo"){
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.jmeno = "Martin";
        obj.prijmeni = "Borec";
        obj.rokNarozeni = 1847;
        res.end(JSON.stringify(obj));
    } else if(req.pathname == "/priklady/kontrola") {


    } else if (req.pathname == "/jsoncitac"){
        res.writeHead(200, {"Content-type": "application/json"});
        let pocet = {};
        druhejcitac ++;
        pocet.cislo = druhejcitac;
        res.end(JSON.stringify(pocet));
    }
    else if (req.pathname == "/denvtydnu"){
        apiDenVTydnu(req, res);
    }
    else if (req.pathname == "/svatky"){
        apiSvatky(req, res);
    }
    else if (req.pathname.startsWith("/users/")) {
        apiUsers(req, res);
    }
    else if (req.pathname == "/chat/listmsgs"){
        apiChat(req, res);
    }
    else if (req.pathname == "/chat/addmsg") {
        apiChat(req, res);
    }
    else if (req.pathname == "/start") {
        let m = {};
        m.tmStart = new Date().getTime();
        let newId = uniqid();
        mereni[newId] = m;

        obj.id= newId;
        obj.status = "Started";
        res.end(JSON.stringify(obj));
    }
    else if (req.pathname == "/stop") {
        let tmStop = new Date().getTime();
        let q = url.parse(req.url, true);
        let id = q.query.id;
        let m = mereni [id];
        obj.status = "Stopped";
        obj.durSec = ((tmStop - m.tmStart)/1000).toFixed(1);
        res.end(JSON.stringify(obj));
    }
    else{
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset = 'UTF8'></head><body>Počet volání: " +citac + "</body></html>");
    }
}

createSpaServer(PORT, processApi);

