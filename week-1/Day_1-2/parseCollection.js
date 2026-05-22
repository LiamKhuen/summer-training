const data = require("./system_logs_day-1.json");
//Check data
//console.log(data[1].events);

// We want to capture every event where status == "fail" OR rows > 100
// User .reduce() and .filter() to accomplish this.

const events = data.filter(checkIssue).reduce(extractID,[]);

/*
---------- Helper Functions ----------
*/

// Function to create test for capturing the appropriate log entries
function checkIssue(logEntry){
    let isIssue = false;

    for(let i = 0; i < logEntry.events.length; i++){
        if(logEntry.events[i].payload.status === "fail" || logEntry.events[i].payload.rows > 100){
            isIssue = true;
        }
    }

    return isIssue;
}

// Function to reduce the error logs down to just their IDs.
function extractID(accumulator, logEntry){
    accumulator.push(logEntry.id);
    return accumulator;
}

// Check out events variable to ensure the proper events are captured.
// console.log(events);