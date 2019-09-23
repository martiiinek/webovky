const http = require("http");

let citac = 0;

http.createServer((req, res) => {
    if (req.url == "/"){
    citac++; //dtoo citac=citac+1
        }
    if (req.url == "/jinastranka") {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html lang='cs'><head><meta charset='UTF8'></head><body>Nečum</body></html>");
    }
        else if (req.url == "/jsondemo")  {
            res.writeHead(200, {"Contennt-type": "application/json"});
            let obj = {};
            obj.jmeno = "BoB";
            obj.prijmeni = "Ross";
            obj.rokNarozeni = 2002;
            res.end(JSON.stringify(obj));
}
     else{
    res.writeHead(200, {"Content-type": "text/html"});
    res.end("<html lang='cs'><head><meta charset='UTF8'></head><body>Počet volání: " +citac +"</body></html>");
        }
}).listen(8888);


