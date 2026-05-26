const fs = require('fs');
const sampleData = "./mock_data-day_2.txt";

async function findTokens(file){
    const tokensSet = new Set();
    const tokensMap = new Map();

    const stream = fs.createReadStream(file, {encoding: 'utf-8', highWaterMark: 512});
    const endTag = ",";

    let trackerString = "";

    for await (chunk of stream){
        trackerString += chunk;

        while(trackerString.includes(endTag)){
            const endIndex = trackerString.indexOf(endTag) + endTag.length;
            const entry = trackerString.slice(0, (endIndex - 1));

            if(entry !== ""){
                tokensSet.add(entry);
                tokensMap.set(entry, (tokensMap.get(entry) || 0) + 1);
            }

            trackerString = trackerString.slice(endIndex);
        }
    }

    console.log(`Here are the tokens in the file: ${[...tokensSet].join(', ')}\n And here is a dictionary of tokens with a count: ${[...tokensMap].join(', ')}`);
}

findTokens(sampleData);

/* ### Lookup Velocity Analysis (Map vs. Set)

1. Memory Architecture under the Hood:
   - Both native JavaScript Map and Set objects utilize Hash Table architectures 
     internally. When verifying uniqueness or looking up keys, the engine 
     calculates a numeric memory hash pointer directly from the input string.
   
2. Execution Path vs. Sequential Array Linear Scans:
   - If an array were utilized via .includes() or .indexOf(), the machine would be 
     forced to execute an explicit execution path scanning indices sequentially, 
     resulting in a time complexity of O(N).
   - Because Map and Set jump directly to localized memory hash buckets, lookups, 
     insertions, and adjustments execute in flat constant time complexity, O(1).
     Whether mock_data-day_2.txt scales to 10,000 or 10,000,000 tokens, verification 
     speeds remain instantaneous and unbothered by data volume.
*/
