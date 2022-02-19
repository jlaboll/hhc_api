const express = require('express');
const app = express();
const port = 7834;

app.use(express.json());

app.listen(port, () => {
    console.log(`HHC API is running on port ${port}`);
});