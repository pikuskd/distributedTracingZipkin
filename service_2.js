const { NodeTracerProvider } = require('@opentelemetry/node')
const { ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/tracing')
const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin')
const provider = new NodeTracerProvider()
const consoleExporter = new ConsoleSpanExporter()
const spanProcessor = new SimpleSpanProcessor(consoleExporter)
provider.addSpanProcessor(spanProcessor)
provider.register()

const zipkinExporter = new ZipkinExporter({
  url: 'http://localhost:9411/api/v2/spans',
  serviceName: 'Service 2',
  own_id: 'tcp918271'
})

const zipkinProcessor = new SimpleSpanProcessor(zipkinExporter)
provider.addSpanProcessor(zipkinProcessor)

const express = require('express')
const app = express()
const port = 3002

const getUrlContents = (url, fetch) => {
  return new Promise((resolve, reject) => {
    fetch(url, resolve, reject)
      .then(res => res.text())
      .then(body => resolve(body))
  })
};

app.get('/service2', async function (req, res) {
  // setTimeout(() => {

  // }, 100);

  const service_3_data = await getUrlContents('http://localhost:4000/service3', require('node-fetch'));
  res.send(service_3_data);

});


app.listen(port, () => { console.log(`Listening at http://localhost:${port}`) }
)
