/* EXPRESS SERVER */
import express from 'express'
import bodyParser from 'body-parser'

/* ROUTER */
import api from './routes'

/* Server */
const app = express();
const PORT = process.env.PORT || 4000;

/*add Router */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));
app.use('/api', api);



app.listen(PORT, (req, res) => {
    console.log(`http://127.0.0.1:${PORT} start!`)
})
