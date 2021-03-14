const grpc = require('grpc');
const greets = require('../server/protos/greet_pb')
const greetService = require('../server/protos/greet_grpc_pb')

const calc = require('../server/protos/calculator_pb')
const calcService = require('../server/protos/calculator_grpc_pb')
const hostAndPort = 'localhost:50051';

const callGreeting = () => {
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

const callLongGreeting = () => {
  const client = new greetService.GreetServiceClient(
    hostAndPort,
    grpc.credentials.createInsecure()
  );

  const request = new greets.LongGreetRequest();

  const call = client.longGreet(request, (error, response) => {
    if (!error) {
      console.log('Server response', response.getResult());
    } else {
      console.error(error);
    }
  })

  let count = 0, intervalID = setInterval(() => {
    console.log('Sending message', count)

    const request = new greets.LongGreetRequest()
    const greeting = new greets.Greeting()
    greeting.setFirstName('Yishai')
    greeting.setLastName('z')

    console.log({ request })
    request.setGreet(greeting)


    const requestTwo = new greets.LongGreetRequest()
    const greetingTwo = new greets.Greeting()
    greetingTwo.setFirstName('Tom')
    greetingTwo.setLastName('Jerry')

    console.log({ requestTwo })
    requestTwo.setGreet(greetingTwo)

    call.write(request)
    call.write(requestTwo)

    if (++count > 3) {
      clearInterval(intervalID)
      call.end()
    }
  }, 1000)

  // // created a protocol buffer greeting message
  // const greeting = new greets.Greeting();
  // greeting.setFirstName('Yishai');
  // greeting.setLastName('z');

  // // set the greeting
  // // request.setGreeting(greeting);

  // console.log('before greet')

  // client.greet(request, (error, response) => {
  //   console.log({ error, response });

  //   if (!error) {
  //     console.log('Greeting response', response.getResult());
  //   } else {
  //     console.error(error);
  //   }
  // });

  // console.log(`hello from client`)
  // setTimeout(()=>console.log('after'), 2000)
  // console.log({ client })
};

const callGreetManyTimes = () => {
  const client = new greetService.GreetServiceClient(
    hostAndPort,
    grpc.credentials.createInsecure()
  );

  const request = new greets.GreetManyTimesRequest();

  const greeting = new greets.Greeting();
  greeting.setFirstName('Yishai');
  request.setGreeting(greeting)

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



const callPrimeNumberDecomposition = () => {
  const client = new calcService.CalculatorServiceClient(
    hostAndPort,
    grpc.credentials.createInsecure()
  );

  const request = new calc.PrimeNumberDecompositionRequest();
  const number = 567890
  request.setNumber(number)



  const call = client.primeNumberDecomposition(request, () => { })


  call.on('data', response => {
    console.log('Prime Factor Found : ', response.getPrimeFactor())
  })

  call.on('error', error => {
    console.error(error)
  })

  call.on('status', status => {
    console.log({ status })
  })

  call.on('end', () => {
    console.log('Streaming Ended !')
  })
}


const callComputeAverage = () => {
  const client = new calcService.CalculatorServiceClient(
    hostAndPort,
    grpc.credentials.createInsecure()
  )

  const request = new calc.ComputeAverageRequest()
console.log('debug 111')
  const call = client.computeAverage(request, (error, response) => {
    if (!error) {
      console.log('Received a response from the server. Avergage : ', response.getAverage())
    }
    else {
      console.error(error)
    }
  })
}



console.log(`hello from client`)

const main = () => {
  callComputeAverage()
  return /////
  callLongGreeting()

  callPrimeNumberDecomposition()

  callGreeting()
  callGreetManyTimes()
  callSum()
}
main();
