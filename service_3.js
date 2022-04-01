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
    serviceName: 'Service 3',
    own_id: 'nckaiskalk'
})

const zipkinProcessor = new SimpleSpanProcessor(zipkinExporter)
provider.addSpanProcessor(zipkinProcessor)

const express = require('express')
const app = express()
const port = 4000

app.get('/service3', async function (req, res) {

    setTimeout(() => {
        res.send("Response from Service 3");
    }, 100);

})


app.listen(port, () => { console.log(`Listening at http://localhost:${port}`) }
)
