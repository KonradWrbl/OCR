module.exports = async function quickstart() {
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
