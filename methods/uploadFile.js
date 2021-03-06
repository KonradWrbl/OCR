module.exports = async function uploadFile(filename) {
    console.log('uploading...');
    const {Storage} = require('@google-cloud/storage')
    const storage = new Storage({
        keyFilename: 'APIKey.json',
        projectId: 'stable-sign-269418'
    })

    

    await storage.bucket('pci_test').upload(filename, {
        gzip: false,
        destination: 'KRUS.pdf',
        metadata: {
            cacheControl: 'public, max-age=31536000',
        }
    })
    console.log('uploaded');
}