const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./services.proto"
var protoLoader = require("@grpc/proto-loader");

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
    GetAll: async (_, callback) => {
        const query = await postgres`
        select * from crawler
        `;
        callback(null, query);
    },

    Get: async (call, callback) => {
        const query = await postgres`
        select * from crawler where id=${call.request.id}
        `;
        callback(null, query);
    }
});

server.bindAsync(
    "0.0.0.0:8000",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      console.log("Server running at http://127.0.0.1:8000");
      server.start();
    }
  );