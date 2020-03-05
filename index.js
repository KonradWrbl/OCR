const express = require('express');

const {Storage} = require('@google-cloud/storage');
const quickstart = require('./methods/example.js')
const OCR = require('./methods/ocr.js')
const downloadJSON = require('./methods/downloadFile.js')
const http = require('http')
const upload = require('express-fileupload')
const uploadFile = require('./methods/uploadFile.js')
const deleteFiles = require('./methods/deleteFiles.js')
const showText = require('./methods/showText')



const app = express();
app.listen(5000, '127.0.0.1', () => console.log('server running'));

app.use(upload())

app.get('/', (req,res) => {
    res.sendFile(__dirname+'/index.html')
})

app.post('/', (req, res) => {
    let filename
    console.log(req.files);
    if(req.files){
        const file = req.files.filename;
        filename = req.files.filename.name;
        file.mv(filename, err => {
            // if (err) {
            //     console.log(err);
            //     res.send('error')
            // }
            // else {
            //     res.send('Done!')
            // }
        })
    }
    console.log(filename);

    const contractor = new RegExp('wykonawc')

    async function start() {
        await quickstart();
        await deleteFiles();
        await uploadFile(filename);
        await OCR();
        await downloadJSON(res);
        //const data = require('./download.json')
        //await showText(data, res);
        
    }
        
    start();
    // let text = '';
    // for(let i of data.responses) {
    //     //console.log(i.fullTextAnnotation.text);
    //     //console.log(' ');
    //     text += i.fullTextAnnotation.text
    //     text += ' '
    // }
    // res.send(text)
})

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





// quickstart();

// OCR();

// downloadJSON();

// let text = '';
// for(let i of data.responses) {
//     //console.log(i.fullTextAnnotation.text);
//     //console.log(' ');
//     text += i.fullTextAnnotation.text
//     text += ' '
// }
// app.get('/', (req, res) => res.send(text))





