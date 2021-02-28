const grpc = require('grpc');
const greets = require('../server/protos/greet_pb')
const service = require('../server/protos/greet_grpc_pb')


const main = () => {
  const hostAndPort = 'localhost:50051';
  const client = new service.GreetServiceClient(
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
main();
