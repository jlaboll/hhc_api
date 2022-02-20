const express = require('express');
const app = express();
const port = 7834;
const api = require('./api.js');
const auth = require('./auth');

app.use(express.json());

app.listen(port, () => {
    console.log(`HHC API is running on port ${port}`);
});

app.get('/hedgehogs/', auth.loginMiddleware, api.getAllHedgehogs);
app.get('/hedgehogs/:id', auth.loginMiddleware, api.getHedgehogById);
app.post('/hedgehogs/', auth.loginMiddleware, api.addHedgehog);
app.put('/hedgehogs/:id', auth.loginMiddleware, api.updateHedgehog);
app.delete('/hedgehogs/:id', auth.loginMiddleware, api.deleteHedgehog);