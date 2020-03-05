module.exports = async function downloadJSON(res) {
    const {Storage} = require('@google-cloud/storage');
    const showText = require('./showText')

    console.log('downloading')

    const storage = new Storage({
        keyFilename: 'APIKey.json',
        projectId: 'stable-sign-269418'
    });

    const bucketName = 'pci_test';
    //const srcFileName = 'aoutput-1-to-20.json';

    storage.getBuckets()

    const options = {
        destination: './download.json'
    }
    
    const bucket = storage.bucket('pci_test');
    bucket.getFiles(async function(err, files) {
        if (!err) {
            console.log(files[1].name);
            await storage
                .bucket(bucketName)
                .file(files[1].name)
                .download(options)
                .then(() => {
                    const data = require('../download.json')
                    console.log('dowloaded')
                    showText(data, res)
                })
            
        }
    });
    // bucket.getMetadata(function(err, metadata, apiResponse) {console.log(apiResponse);});
}
