const express = require('express');
const data = require('./pdfoutput-1-to-18.json')
const {Storage} = require('@google-cloud/storage');
const quickstart = require('./methods/example.js')
const OCR = require('./methods/ocr.js')
const downloadJSON = require('./methods/downloadFile.js')


const app = express();
app.listen(5000, '127.0.0.1', () => console.log('server running'));
//const {Storage} = require('@google-cloud/storage');
//const form = document.querySelector('form')

// form.addEventListener('submit', e => {
//   e.preventDefault()

//   const files = document.querySelector('[type=file]').files
//   const formData = new FormData()

//   for (let i = 0; i < files.length; i++) {
//     let file = files[i]

//     formData.append('files[]', file)

//   }

//   const storage = new Storage({
//     keyFilename: 'APIKey.json',
//     projectId: 'stable-sign-269418'
//   })

//   async function uploadFile() {
//       await storage.bucket('pci_test').upload(file, {
//           gzip: true,
//           metadata: {
//               cacheControl: 'public, max-age=31536000'
//           }
//       })
//       console.log(`uploaded`);
//   }
//   uploadFile();

// })

quickstart();

OCR();

downloadJSON();

let text = '';
for(let i of data.responses) {
    //console.log(i.fullTextAnnotation.text);
    //console.log(' ');
    text += i.fullTextAnnotation.text
    text += ' '
}
app.get('/', (req, res) => res.send(text))





