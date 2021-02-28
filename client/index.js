const grpc = require('grpc')

const services = require('../server/protos/dummy_grpc_pb')

const main = () => {
    const hostAndPort = "localhost:50051"
    const client = new services.DummyServiceClient(
        hostAndPort,
        grpc.credentials.createInsecure()
    )

    // here we will do stuff later

    console.log(`hello from client`)

    console.log({ client })
}
main();
