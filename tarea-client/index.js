const express = require('express');
const {client1,client2,client3} = require('./redis.js');
const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./services.proto"
var protoLoader = require("@grpc/proto-loader");

const app = express();

app.listen(3000);

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const TareaServicios = grpc.loadPackageDefinition(packageDefinition).TareaServicios;


const clientService = new TareaServicios(
    "grpc_server:8000",
    grpc.credentials.createInsecure()
);

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

app.get('/crawler', async (req, res) => {

    const cache = await client1.get("crawler")
    if(cache)
    {
        res.json(JSON.parse(cache));
    }
    else
    {
        clientService.GetAll((error,items) =>{
            if(error){
                res.status(400).json(error);
            }
            else{
                data = JSON.stringify(items)
                res.json(items);
            }
        })
    }

})

app.get('/crawler/:id', async (req, res) => {

    const cache = await client1.get(req.params.id)
    if(cache)
    {
        res.json(JSON.parse(cache));
    }
    else
    {
        clientService.Get(req.params.id, (error,items) =>{
            if(error){
                res.status(400).json(error);
            }
            else{
                data = JSON.stringify(items)
                res.json(items);
            }
        })
    }

})