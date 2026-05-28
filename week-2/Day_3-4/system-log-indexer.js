const fs = require('fs');
const sampleData = "./system_configs-dirty.json";

function logIndexBuilder(file){
    let logIndex = {}
    // Initiate the variable outside of the try...catch for accessibility.
    let logData; 
    
    try{
        logData = JSON.parse(fs.readFileSync(file, 'utf-8'));
    } catch (err){
        // Setting default value to null as an easy catch if this variable is used later.
        logData = null;
        console.error(err);
        return;
    }
    
    for (const entry of logData){
        recordLog(entry, logIndex);
    }

    console.log(logIndex);
    
}

/* ---------- Helper Functions ---------- */

function recordLog(logEntry, indexObj){
    if(logEntry != null){
        const env = logEntry.environment ?? "Unknown";
        const status = logEntry.status ?? "Unknown";

        // Dynamically build logIndex schema via short-circuit allocation
        indexObj[env] ??= {};
        indexObj[env][status] ??= [];

    indexObj[env][status].push(logEntry.id ?? "Unknown");
    } else{
        indexObj.Quarantine ??= {};
        indexObj.Quarantine.count = (indexObj.Quarantine.count ?? 0) + 1;
    }
}

/* ---------- Main Function Call ---------- */
logIndexBuilder(sampleData);
