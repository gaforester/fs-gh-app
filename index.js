require('dotenv').config();
const express = require(`express`);
const bodyParser = require(`body-parser`);
var cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client/build'));
app.use('/manage/health', (req, res) => res.status(200).send('UP').end());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${ PORT }`);
});
