const express = require('express');
const postgres = require('./postgres.js')

const app = express();

app.listen(3000);

app.get("/url/?", async (req, res) => {

    const {title, description, keywords, url} = req.query

    const datos = {
        title,
        description,
        keywords,
        url
    }

    const query = await postgres`
    insert into crawler ${
        postgres(datos, 'title', 'description', 'keywords', 'url')
    }
    `;
    res.send('Listo');
})