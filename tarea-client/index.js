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
    "127.0.0.1:50051",
    grpc.credentials.createInsecure()
  );

app.get('/crawler', async (req, res) => {

    const cache = await client1.get("crawler")
    if(cache)
    {
        console.log('Cache!!')
        res.json(JSON.parse(cache));
    }
    else
    {
        console.log('Consultando backend!!')
        clientService.GetAll(null, (error,items) =>{
            if(error){
                res.status(400).json(error);
            }
            else{
                data = JSON.stringify(items)
                client1.set('crawler', data)
                res.json(items);
            }
        })
    }

})

app.get('/crawler/:id', async (req, res) => {

    const cache = await client1.get(req.params.id)
    if(cache)
    {
        console.log('Cache!!')
        res.json(JSON.parse(cache));
    }
    else
    {
        console.log('Consultando backend!!')
        clientService.Get({id : req.params.id}, (error,items) =>{
            if(error){
                res.status(400).json(error);
            }
            else{
                data = JSON.stringify(items)
                client1.set(req.params.id, data)
                res.json(items);
            }
        })
    }

})