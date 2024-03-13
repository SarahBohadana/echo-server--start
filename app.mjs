import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const { PORT, HOST } = process.env;
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/movies', (req,res) => {
    const {name, year, genre} = req.query;
    res.send('the movie ' + req.query.name + ' went out on the year of ' + req.query.year + ' the genre is ' +req.query.genre);
});

app.get('/movies/movie/:isOut', (req, res) => {
    const {name} = req.query;
    res.status(200).send(name + ' is ' + req.params.isOut);
});

app.get('/', (req, res) => {
    let greeting = "WooHoo";
    let date = "March 13th, 2024";
    const info = `<h1>${greeting}</h1>
    <p>WELCOME all movie FANS</p>
    <p>${date}</p>`
    res.status(200).send(info);
});

app.post('/movies/update', (req,res) =>{
    res.status(200).json('the movie ' + req.body.name + ' has been updated')
});

app.listen(PORT, HOST,  ()=> {
    console.log(`listening on`,`http://${HOST}:${PORT}`);
});

app.use((req, res, next) => {
    res.status(404).send('Error 404 ' + req.url + ' not found');
});
