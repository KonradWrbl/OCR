module.exports = async function OCR() {
    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient({
        keyFilename: 'APIKey.json',
    });

    console.log('ocr started');

    const gcsSourceUri = 'gs://pci_test/KRUS.pdf';
    const gcsDestinationUri = 'gs://pci_test/a'

    const inputConfig = {
        mimeType: 'application/pdf',
        gcsSource: {
            uri: gcsSourceUri,
        }
    }

    const outputConfig = {
        gcsDestination: {
            uri: gcsDestinationUri,
            batchSize: 3,
        }

    }

    const features = [{type: 'DOCUMENT_TEXT_DETECTION'}];
    const request = {
        requests: [
            {
                inputConfig: inputConfig,
                features: features,
                outputConfig: outputConfig
            }
        ]
    }

    const [operation] = await client.asyncBatchAnnotateFiles(request)
    const [filesResponse] = await operation.promise();
    const destinationUri = filesResponse.responses[0].outputConfig.gcsDestination.uri;
    console.log('Json saved to: ' + destinationUri);
    console.log('safa');
}
