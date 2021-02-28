const greets = require('../server/protos/greet_pb')
const service = require('../server/protos/greet_grpc_pb')

const grpc = require('grpc')

/*
    Implements the greet RPC method.
*/

const greet = (call, callback) => {
    const greeting = new greets.GreetResponse()

    greeting.setResult(
        "Hellow " + call.getGreeting().getFirstname()
    )

    callback(null, greeting)
}

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
