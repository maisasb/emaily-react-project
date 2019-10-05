const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ bye: 'buddy' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
//http://localhost:5000/
//https://git.heroku.com/boiling-temple-05045.git
//https://boiling-temple-05045.herokuapp.com/