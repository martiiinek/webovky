const crypto = require("crypto");

function zamixujHeslo(pw) {
    let mixPw = crypto.createHash("md5").update(pw).digest("hex");
    return mixPw;
}

let pwd = "testicek";
console.log(zamixujHeslo(pwd));
