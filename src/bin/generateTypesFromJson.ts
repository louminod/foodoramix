import * as path from "path";
import * as fs from "fs";
import {compileFromFile} from 'json-schema-to-typescript'

async function run() {

    fs.readdir("./src/schemas/types/", (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join("./src/schemas/types/", file), err => {
                if (err) throw err;
            });
        }
    });

    fs.readdir("./src/schemas/json", function (err, files) {
        if (err) {
            return console.log(err);
        }

        files.forEach(function (file) {
            const fileName = file.split(".json")[0];

            compileFromFile("./src/schemas/json/" + file)
                .then(ts => fs.writeFileSync("./src/schemas/types/" + fileName + '.d.ts', ts))
        });
    });
    console.log("generation of types from json schemas done");
}

run().catch(console.error)