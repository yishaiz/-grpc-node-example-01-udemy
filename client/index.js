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



const callGreetManyTimes = () => {
  const hostAndPort = 'localhost:50051';
  const client = new greetService.GreetServiceClient(
    hostAndPort,
    grpc.credentials.createInsecure()
  );

  const request = new greets.GreetManyTimesRequest();

  const greeting = new greets.Greeting();
  greeting.setFirstName('Yishai');

  const call = client.greetManyTimes(request, () => { })

  call.on('data', (response) => {
    console.log('Client Streaming Response : ', response.getResult());
  })

  call.on('status', (status) => {
    console.log({ status });
  })

  call.on('error', (error) => {
    console.error(error);
  })

  call.on('end', () => {
    console.log('Streaming Ended !');
  })
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
  callGreetManyTimes()
  callSum()
}
main();
