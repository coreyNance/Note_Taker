const express = require('express');
const app = express();
const path = require("path"); 
const methods = require('./routes/methods');
const PORT = process.env.PORT || 3000;


app.use(express.static("public"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());




app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


app.get('/', (req, res) => {

    console.log('user hit the resource');
    res.send('this is linked');
})


app.get('/api/notes', (req, res) => {

   methods.getApi(req, res);
})


app.post('/api/notes', (req, res) => {

    methods.postApi(req, res);

})

app.delete("/api/notes/:id", (req, res) => {
    methods.deleteApi(req, res);
})



app.listen(PORT,()=> {
    console.log(`App listening on PORT: ${PORT}`)
})







