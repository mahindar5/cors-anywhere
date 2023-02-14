// import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
// import { registerInstrumentations } from '@opentelemetry/instrumentation';
// import { Resource } from '@opentelemetry/resources';
// import { BatchSpanProcessor, WebTracerProvider } from '@opentelemetry/sdk-trace-web';
// import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

var otlp = require('@opentelemetry/exporter-trace-otlp-http');
var resources = require('@opentelemetry/resources');
var nodetra = require('@opentelemetry/sdk-trace-node');
var instrumentation = require('@opentelemetry/instrumentation');

var resource = resources.Resource.default().merge(
  new resources.Resource({
    'service.name': 'Cors',
    // [SemanticResourceAttributes.SERVICE_VERSION]: '0.1.0',
  }));
var provider = new nodetra.NodeTracerProvider({resource: resource});

// For demo purposes only, immediately log traces to the console
// provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

// Batch traces before sending them to HoneyComb
provider.addSpanProcessor(
  new nodetra.BatchSpanProcessor(
    new otlp.OTLPTraceExporter({
      url: 'https://api.honeycomb.io/v1/traces',
      headers: {
        'x-honeycomb-team': 'n9Wwhe4eTBKkYgYdffeBrnA',
      },
    })));

provider.register();

instrumentation.registerInstrumentations([]);
