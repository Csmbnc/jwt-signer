const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

app.post('/sign', (req, res) => {
  const { header, payload, private_key } = req.body;

  try {
    const token = jwt.sign(payload, private_key, {
      algorithm: 'RS256',
      header: header
    });

    res.json({ signed_jwt: token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/', (req, res) => {
  res.send('JWT Signer is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`JWT Signer listening on port ${PORT}`);
});