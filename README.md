# distributedTracingZipkin

Distributed Tracing using Zipkin


-> After cloning the project, <br /> <br />

1) Start a docker Zipkin Image <br />

`docker run -d -p 9411:9411 openzipkin/zipkin` <br /> 
to start a zipkin container <br />

2) 'npm i' -> to install all the packages <br />

3) Create 3 separate tabs <br />
  -> 'node service_1.js' <br />
  -> 'node service_2.js' <br />
  -> 'node service_3.js' <br /> <br />
  
4) Then open the following ports to access the Zipkin UI and the services: <br />
    -> 'http://localhost:3001/service1' for Service 1 that calls Service 2
    -> 'http://localhost:3002/service2' for Service 2 that calls Service 3
    -> 'http://localhost:4000/service3' for Service 3
    -> 'http://localhost:9411/zipkin/' for the Zipkin UI for viewing individual traces
