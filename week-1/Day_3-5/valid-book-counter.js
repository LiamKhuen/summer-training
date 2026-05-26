/* The following concept altered as I progressed in my training schedule, but I am leaving this for posterity. 
    Code concept: thinking of this as a helper function in a larger JavaScript program for dealing with book data contained in XMLs
    function countValidBooks() {
        let totalLengthVB = 0;
        let missingEraCount = 0;

        For <book> entry in XML
            is era?
                true = totalLengthVB += book.text_length;
                false = missingEraCount += 1;

        console.log("The total length of all books containing Era data is: " + totalLengthVB + "/nThe count of books missing Era data is: " + missingEraCount);
    }

    countValidBooks();
*/
const fs = require('fs');
const sampleData = "./catalog.xml";

async function countValidBooks(filePath) {
    let catalogMetrics = {
        totalLengthVB: 0,
        missingEraCount: 0
    };

    const stream = fs.createReadStream(filePath, {encoding: 'utf-8', highWaterMark: 512});
    const startTag = "<book>";
    const endTag = "</book>";

    let trackerString = "";

    for await (chunk of stream) {
        trackerString += chunk;

        while(trackerString.includes(endTag)){
            const endIndex = trackerString.indexOf(endTag) + endTag.length;
            const entry = trackerString.slice(trackerString.indexOf("<book>"), endIndex);

            checkBook(entry, catalogMetrics);

            trackerString = trackerString.slice(endIndex);
        }

    }

    console.log("The total length of all books containing Era data is: " + catalogMetrics.totalLengthVB + "\nThe count of books missing Era data is: " + catalogMetrics.missingEraCount);
}

/* ---------- Helper Methods ---------- */
function checkBook(bookEntry, metrics){

    bookEntry.match(/<era>.+<\/era>/g)
    ? metrics.totalLengthVB += parseInt((bookEntry.match(/<text_length>(\d+)<\/text_length>/) ?? [0,0])[1])
    : metrics.missingEraCount++;

}

countValidBooks(sampleData);
