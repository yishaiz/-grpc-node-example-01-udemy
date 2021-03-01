const greets = require('../server/protos/greet_pb')
const greetService = require('../server/protos/greet_grpc_pb')

const calc = require('../server/protos/calculator_pb')
const calcService = require('../server/protos/calculator_grpc_pb')


const grpc = require('grpc')

/*
    Implements the greet RPC method.
*/

const primeNumberDecomposition = (call, callback) => {
    let number = call.request.getNumber()
    let dividor = 2

    while (number > 1) {
        if (number % divisor === 0) {
            const primeNumberDecompositionResponse = new call.primeNumberDecompositionResponse()

            primeNumberDecompositionResponse.setPrimeFactor(divisor)

            number = number / divisor

            call.write(primeNumberDecompositionResponse)
        }
        else {
            divisor++
            console.log('Divisor has increased to ', divisor)
        }
        call.end()
    }
}

const greet = (call, callback) => {
    const greeting = new greets.GreetResponse()

    greeting.setResult(
        "Hello " + call.request.getGreeting().getFirstName()
    )

    callback(null, greeting)
}

const greetManyTimes = (call, callback) => {
    const firstName = call.request.getGreeting().getFirstName()
    console.log({ firstName })

    let count = 0, intervalID = setInterval(() => {
        const greetManyTimesResponse = new greets.GreetManyTimesResponse()
        greetManyTimesResponse.setResult(firstName)

        // setup streaming
        call.write(greetManyTimesResponse)

        if (++count > 9) {
            clearInterval(intervalID)

            call.end() // we have sent all messages
        }
    }, 1000)
}

const sum = (call, callback) => {
    const sumResponse = new calc.SumResponse()
    const firstNumber = call.request.getFirstNumber()
    const secondNumber = call.request.getSecondNumber()
    const result = firstNumber + secondNumber

    sumResponse.setSumResult(result)
    callback(null, sumResponse)
}

const main = () => {
    const server = new grpc.Server()

    // server.addService(service.GreetServiceClient, {greet: greet})
    server.addService(greetService.GreetServiceService, {
        greet,
        greetManyTimes,
        primeNumberDecomposition
    })
    server.addService(calcService.CalculatorServiceService, { sum })

    // console.log({grpc, server})
    const hostAndPort = "127.0.0.1:50051"
    server.bind(hostAndPort, grpc.ServerCredentials.createInsecure())
    server.start()
    // console.log({server})

    console.log(`Server is running on ${hostAndPort}`)
}
main();
