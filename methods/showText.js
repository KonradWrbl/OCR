module.exports = async function showText(data, res) {

    const regex = /[^.?!]*(?<=[.?\s!])(zobowiązany)(?=[\s.?!])[^.?!]*[.?!]/gmi;

    let text = '';
    for(let i of data.responses) {
        //console.log(i.fullTextAnnotation.text);
        //console.log(' ');
        text += i.fullTextAnnotation.text
        text += ' '
    }
    //console.log(text)
    console.log('texting...');
    let m;
    let t = '';
    while ((m = regex.exec(text)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            console.log(`Found match, group ${groupIndex}: ${match}`);
            t+=(match+'\n\r'+'<br>')
        });
    }

    //app.get('/', (req, res) => res.send(text))
    console.log(t);
    res.send(t)
}