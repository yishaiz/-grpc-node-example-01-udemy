const grpc = require('grpc')
const main = () => {
    const server = new grpc.Server()
    // console.log({grpc, server})
    const hostAndPort = "127.0.0.1:50051"
    server.bind(hostAndPort, grpc.ServerCredentials.createInsecure())
    server.start()
    // console.log({server})

    console.log(`Server is running on ${hostAndPort}`)
}
main();
