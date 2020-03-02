module.exports = async function deleteFiles() {
    const {Storage} = require('@google-cloud/storage')
    const storage = new Storage({
        keyFilename: 'APIKey.json',
        projectId: 'stable-sign-269418'
    })

    const bucket = storage.bucket('pci_test');
    bucket.deleteFiles(function(err) {});

}