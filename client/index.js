const grpc = require('grpc');
const greets = require('../server/protos/greet_pb')
const greetService = require('../server/protos/greet_grpc_pb')

const calc = require('../server/protos/calculator_pb')
const calcService = require('../server/protos/calculator_grpc_pb')



const callGreeting = () => {
  const hostAndPort = 'localhost:50051';
  const client = new greetService.GreetServiceClient(
    hostAndPort,
    grpc.credentials.createInsecure()
  );

  // create our request
  const request = new greets.GreetRequest();

  // created a protocol buffer greeting message
  const greeting = new greets.Greeting();
  greeting.setFirstName('Yishai');
  greeting.setLastName('z');

  // set the greeting
  request.setGreeting(greeting);

  console.log('before greet')

  client.greet(request, (error, response) => {
    console.log({ error, response });

    if (!error) {
      console.log('Greeting response', response.getResult());
    } else {
      console.error(error);
    }
  });

  console.log(`hello from client`)
  // setTimeout(()=>console.log('after'), 2000)
  // console.log({ client })
};

const callSum = () => {
  const hostAndPort = 'localhost:50051';
  const client = new calcService.CalculatorServiceClient(
    hostAndPort,
    grpc.credentials.createInsecure()
  );

  // create our request
  const sumRequest = new calc.SumRequest();

  sumRequest.setFirstNumber(10);
  sumRequest.setSecondNumber(15);

  client.sum(sumRequest, (error, response) => {
    if (!error) {
      console.log(sumRequest.getFirstNumber() + " + " + sumRequest.getSecondNumber() +
        " = " + response.getSumResult())
    } else {
      console.error(error);
    }
  })
};

console.log(`hello from client`)

const main = () => {
  callGreeting()
  callSum()
}
main();
