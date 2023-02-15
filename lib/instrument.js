const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { Resource } = require('@opentelemetry/resources');
const { NodeTracerProvider, BatchSpanProcessor } = require('@opentelemetry/sdk-trace-node');

var resource = Resource.default().merge(
  new Resource({
    'service.name': 'Cors',
  }));
var provider = new NodeTracerProvider({ resource: resource });

// For demo purposes only, immediately log traces to the console
// provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

// Batch traces before sending them to HoneyComb
provider.addSpanProcessor(
  new BatchSpanProcessor(
    new OTLPTraceExporter({
      url: 'https://api.honeycomb.io/v1/traces',
      headers: {
        'x-honeycomb-team': 'n9Wwhe4eTBKkYgYdffeBrnA',
      },
    })));

provider.register();
