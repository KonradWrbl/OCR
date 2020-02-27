const express = require('express');
const fetch = require('node-fetch');
const data = require('./pdfoutput-1-to-18.json')
const path = require('path');
const {Storage} = require('@google-cloud/storage');

const app = express();
app.listen(5000, '127.0.0.1', () => console.log('server running'));


async function quickstart() {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        keyFilename: 'APIKey.json',
    });

    // Performs label detection on the image file
    const [result] = await client.labelDetection('./pic.jpg');
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
}

quickstart();

async function OCR() {
    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient({
        keyFilename: 'APIKey.json',
    });

    const gcsSourceUri = 'gs://pci_test/KRUS.pdf';
    const gcsDestinationUri = 'gs://pci_test/pdf'

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

OCR();
let text = '';
for(let i of data.responses) {
    //console.log(i.fullTextAnnotation.text);
    //console.log(' ');
    text += i.fullTextAnnotation.text
    text += ' '
}
app.get('/', (req, res) => res.send(text))



const storage = new Storage({
    keyFilename: 'APIKey.json',
    projectId: 'stable-sign-269418'
});
const bucketName = 'pci_test';
const srcFileName = 'pdfoutput-1-to-18.json';

storage.getBuckets()

async function downloadJSON() {
    const options = {
        destination: './download.json'
    }

    await storage
        .bucket(bucketName)
        .file(srcFileName)
        .download(options)
}

downloadJSON();
