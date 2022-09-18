const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./services.proto"
var protoLoader = require("@grpc/proto-loader");
const postgres = require("./postgres.js");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const serviceProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(serviceProto.TareaServicios.service, {
    GetAll: async ( call, callback) => {
        const query = await postgres`
        select * from crawler
        `;
        callback(null, {urls : query});
    },

    Get: async (call, callback) => {

        const query = await postgres`
        select * from crawler where id=${call.request.id}
        `;

        callback(null, {urls : query});
    }
});


server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      console.log("Server running at http://127.0.0.1:50051");
      server.start();
    }
  );