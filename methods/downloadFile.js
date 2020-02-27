module.exports = async function downloadJSON() {
    const {Storage} = require('@google-cloud/storage');

    console.log('downloading')

    const storage = new Storage({
        keyFilename: 'APIKey.json',
        projectId: 'stable-sign-269418'
    });
    const bucketName = 'pci_test';
    const srcFileName = 'pdfoutput-1-to-20.json';

    storage.getBuckets()

    const options = {
        destination: './download.json'
    }

    await storage
        .bucket(bucketName)
        .file(srcFileName)
        .download(options)
    console.log('dowloaded')
}
