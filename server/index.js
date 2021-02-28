const greets = require('../server/protos/greet_pb')
const greetService = require('../server/protos/greet_grpc_pb')

const calc = require('../server/protos/calculator_pb')
const calcService = require('../server/protos/calculator_grpc_pb')


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

const sum = (call, callback) => {
    const sumResopnse = new calc.SumResponse()
    const firstNumber = call.request.getFirstNumber()
    const secondNumber = call.request.getSecondNumber()
    const result = firstNumber + secondNumber

    sumResopnse.setSumResult(result)
    callback(null, sumResopnse)
}

const main = () => {
    const server = new grpc.Server()

    // server.addService(service.GreetServiceClient, {greet: greet})
    server.addService(greetService.GreetServiceService, { greet: greet })
    server.addService(calcService.CalculatorServiceService, { sum })

    // console.log({grpc, server})
    const hostAndPort = "127.0.0.1:50051"
    server.bind(hostAndPort, grpc.ServerCredentials.createInsecure())
    server.start()
    // console.log({server})

    console.log(`Server is running on ${hostAndPort}`)
}
main();
