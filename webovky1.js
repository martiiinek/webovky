const http = require("http");
const dateformat = require("dateformat");
const fs = require ("fs");
const DNY_V_TYDNU = ["Neděle","Pondělí","Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];

let citac = 0;

function processStaticFiles (res, fileName) {
    fileName = fileName.substr(1);
    console.log(fileName);
    let contentType = "text/html";
    if (fileName.endsWith(".png")) {
        contentType = "image/png";
    } else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
        contentType = "image/jpeg";
    }
    if (fs.existsSync(fileName)) {
        fs.readFile(fileName, function (err, data) {
            res.writeHead(200, {"Content-Type": contentType});
            res.write(data);
            res.end();
        });
    } else {
        res.writeHead(404); // soubor neexistuje
        res.end();
    }
}

    http.createServer((req, res) => {
        if (req.url == "/") {
            citac++; //dtoo citac=citac+1
            processStaticFiles(res, "/index.html");
            return;
        }
        if (req.url.length - req.url.lastIndexOf(".") < 6)
        {
            processStaticFiles(res, req.url);
            return;
        }
        if (req.url == "/jinastranka") {
            res.writeHead(200, {"Content-type": "text/html"});
            res.end("<html lang='cs'><head><meta charset='UTF8'></head><body>Nečum</body></html>");
        } else if (req.url == "/jsondemo") {
            res.writeHead(200, {
                "Contennt-type": "application/json"
            });
            let obj = {};
            obj.jmeno = "BoB";
            obj.prijmeni = "Ross";
            obj.rokNarozeni = 2002;
            res.end(JSON.stringify(obj));
        } else if (req.url == "/jsoncitac") {
            citac++;
            res.writeHead(200, {"Content-type": "application/json"});
            let obj = {};
            obj.pocetVolani = citac;
            res.end(JSON.stringify(obj));
        } else if (req.url == "/datum") {
            res.writeHead(200, {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            });
            let d = new Date();
            let obj = {};
            obj.systdatum = d;
            obj.denVTydnuCiselne = d.getDate();
            obj.datumcesky = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
            obj.datumceksyformat = dateformat(d, "dd.mm.yyyy");
            obj.datumacasceskyformat = dateformat(d, "dd.mm.yy hh:mm:ss");
            obj.cascesky = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            obj.denvtydnucesky = DNY_V_TYDNU [d.getDay()];
            res.end(JSON.stringify(obj));
        } else {
            res.writeHead(200, {"Content-type": "text/html"});
            res.end("<html lang='cs'><head><meta charset='UTF8'></head><body>Počet volání: " + citac + "</body></html>");
        }
    }).listen(8888);



