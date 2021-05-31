const express = require('express');
const app = express();
const path = require("path"); // The path thats required for html routes. will go with html methods.
const fs = require("fs");
const { v4: uuidv4 } = require('uuid'); // code to create unique ID will go with api methods
const methods = require('./routes/methods');
const PORT = process.env.PORT || 5000;
const notesData = require('./db/db.json');


app.use(express.static("public"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());



// routes for html

app.get('/notes', function(request, response) {
    response.sendFile(path.join(__dirname, './public/notes.html'));
});


app.get('/', (req, res) => {

    console.log('user hit the resource');
    res.send('this is linked');
})


app.get('/api/notes', (req, res) => {

   methods.data.getApi(req, res);
})


app.post('/api/notes', (req, res) => {

    methods.data.postApi(req, res);

})

app.delete("/api/notes/:id", (req, res) => {


    methods.data.deleteApi(req, res, notesData);

    methods.data.writeToDB(notesData);
    
    })








app.listen(PORT,()=> {
    console.log(`App listening on PORT: ${PORT}`)
})



