const greets = require('../server/protos/greet_pb')
const greetService = require('../server/protos/greet_grpc_pb')


const calculates = require('../server/protos/calculator_pb')
const calculatorService = require('../server/protos/calculator_grpc_pb')


const grpc = require('grpc')

/*
    Implements the greet RPC method.
*/

const greet = (call, callback) => {
    const greeting = new greets.GreetResponse()

    greeting.setResult(
        "Hello " + call.request.getGreeting().getFirstName()
    )

    callback(null, greeting)
}


const calculate = (call, callback)=>{
    const calculate = new calculates.CalculateResponse()

    const firstNum = call.request.get
    const result = 33
    calculate.setResult(ressult    )

}

const main = () => {
    const server = new grpc.Server()

    // server.addService(service.GreetServiceClient, {greet: greet})
    server.addService(greetService.GreetServiceService, { greet: greet })

    // console.log({grpc, server})
    const hostAndPort = "127.0.0.1:50051"
    server.bind(hostAndPort, grpc.ServerCredentials.createInsecure())
    server.start()
    // console.log({server})

    console.log(`Server is running on ${hostAndPort}`)
}
main();
