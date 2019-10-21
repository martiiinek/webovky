


const dateformat = require("dateformat");

const DNY_V_TYDNU = ["Neděle","Pondělí","Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];
exports.apiDenVTydnu = function (req, res)
{
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
}