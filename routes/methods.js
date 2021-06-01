const fs = require("fs");
const { v4: uuidv4 } = require('uuid'); 
let methods = {};




methods.getApi = function(req, res) {

    console.log('the get worked');
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    res.json(data);
}


methods.postApi = function(req, res) {


    const newNote = req.body;
    console.log(newNote);


    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    newNote.id = uuidv4();
    data.push(newNote);

    fs.writeFileSync('./db/db.json', JSON.stringify(data));

    console.log("successfull");

    res.json(data);

}


methods.deleteApi = function(req, res) {

    let notesData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    // let id = req.params.id.toString();
    // console.log(id);


    // for (let i = 0; i < notesData.length; i++) {
        
    //     if(notesData[i].id == id) {
    //         console.log("match!");
    //         res.send(notesData[i]);

    //         notesData.splice(i,1);
    //         break;
    //     }
    // }

    let id = req.params.id.toString();
    let noteIndex = notesData.findIndex((note) => note.id === id)
    if (noteIndex >= 0) {
        notesData.splice(noteIndex,1);
        fs.writeFileSync('./db/db.json', JSON.stringify(notesData));
        res.sendStatus(200);
        // res.status(200).send();
    } else {
        // res.status(404).send()
        res.sendStatus(404);
    }
    
}

module.exports = methods;