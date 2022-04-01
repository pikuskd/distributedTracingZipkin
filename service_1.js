const { NodeTracerProvider } = require('@opentelemetry/node')
const { ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/tracing')
const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin')
const provider = new NodeTracerProvider()
const consoleExporter = new ConsoleSpanExporter()
const spanProcessor = new SimpleSpanProcessor(consoleExporter)
provider.addSpanProcessor(spanProcessor)

const zipkinExporter = new ZipkinExporter({
  url: 'http://localhost:9411/api/v2/spans',
  serviceName: 'Service 1',
  own_id: 'tcp918291'
})

const zipkinProcessor = new SimpleSpanProcessor(zipkinExporter)
provider.addSpanProcessor(zipkinProcessor)
provider.register()

const express = require('express')
const { plugin } = require('@opentelemetry/plugin-express')
const { enabled } = require('express/lib/application')
const { acceptsEncodings } = require('express/lib/request')
const app = express()
const port = 3001

const getUrlContents = (url, fetch) => {
  return new Promise((resolve, reject) => {
    fetch(url, resolve, reject)
      .then(res => res.text())
      .then(body => resolve(body))
  })
}

app.get('/service1', async (req, res) => {

  // setTimeout(() => {
  //     axois.get('http://localhost:3001/service1', {

  //     })
  // }, 100);

  //fetch data running from second service
  const service_2_data = await getUrlContents('http://localhost:3002/service2', require('node-fetch'));
  res.send(service_2_data);
});

app.listen(port, () => { console.log(`Listening at http://localhost:${port}`) })


