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

    let id = req.params.id.toString();
    let noteIndex = notesData.findIndex((note) => note.id === id)
    if (noteIndex >= 0) {
        notesData.splice(noteIndex,1);
        fs.writeFileSync('./db/db.json', JSON.stringify(notesData));
        res.sendStatus(200);
      
    } else {
       
        res.sendStatus(404);
    }
    
}

module.exports = methods;