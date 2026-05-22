const data = require("./system_logs_day-1.json");

const badEventIds = data.reduce((accumulator, logEvent) => {
    if(checkIssue(logEvent)){
        accumulator.push(logEvent.id);
    }

    return accumulator;
}, []);

/*
---------- Helper Functions ----------
*/

// Function to create test for capturing the appropriate log entries
function checkIssue(logEntry){
    // Removing local state variable, but keeping record for educational purposes
    // let isIssue = false;

    for(let i = 0; i < logEntry.events.length; i++){
        if(logEntry.events[i].payload.status === "fail" || logEntry.events[i].payload.rows > 100){
            // isIssue = true;
            return true;

        }
    }
    
    // return isIssue;
    return false;
}

// Check the badEventIds to ensure function(s) working properly
// console.log(badEventIds);