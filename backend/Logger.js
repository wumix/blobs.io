const Base = require("./Base.js");

module.exports = class Logger {
    constructor(requests = { total:0, ffa:0 }) {
        this.requests = requests;
    }

    async log() {
        const result = await Base.sqlite.all("SELECT * FROM logs");
        if (!result.some(v => v.name === "total")) {
            await Base.sqlite.run("INSERT INTO logs VALUES ('total', 0)");
        } else if (!result.some(v => v.name === "ffa")) {
            await Base.sqlite.run("INSERT INTO logs VALUES ('ffa', 0)");
        }
        await Base.sqlite.prepare("UPDATE logs SET amount=? WHERE name=?").then(v => v.run([ this.requests.total, "total" ]));
        await Base.sqlite.prepare("UPDATE logs SET amount=? WHERE name=?").then(v => v.run([ this.requests.ffa, "ffa" ]));;
        return this.requests;
    }
};