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


methods.deleteApi = function(req, res, notesData) {


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

    let deletedNote
    let id = req.params.id.toString();
    let noteIndex = notesData.findIndex((note) => note.id === id)
    if (noteIndex >= 0) {
        notesData.splice(noteIndex,1);
        res.status(200).send()
    } else {
        res.status(404).send()
    }


}


methods.writeToDB = function(notes){
    
    notes = JSON.stringify(notes);
    console.log (notes);
    
    fs.writeFileSync("./db/db.json", notes, function(err){
        if (err) {
            return console.log(err);
        }
    });
}



module.exports = methods;