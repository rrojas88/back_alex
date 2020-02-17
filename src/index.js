const express = require('express');

const log = require('../utils/general');
const bd = require('./bd1');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello Word');
});

app.get('/info', (req, res) => {
  const { id } = req.query;
  const msg = bd.bd_mensajes.filter(item => item.id === +id);

  let respon = `No se encontro msg con id ${id}`;
  if (msg.length !== 0) {
    const info = msg[0];
    respon = `[${info.target}] : ${info.message}`;
  }

  res.send(respon);
});
app.get('/info2', (req, res) => {
  res.send('Info DOS !!!');
});

app.get('*', (req, res) => {
  res.status(404).send('NOT FOUND');
});

app.listen(4000, () => {
  log.info('Running in port 4000');
});
