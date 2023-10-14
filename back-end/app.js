const express = require('express')
const app = express()
const port = 3000


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.send('Hello World!!')
})

app.get('*', (req, res) => {
    const requestedURL = req.url;
    console.log(`Received a request for URL: ${requestedURL}`);
    res.send(`${requestedURL}`);
  });
