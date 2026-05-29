# Week 1 Progress Quiz
_Complete this diagnostic check unassisted during your Friday morning verification block. Document answers in a clean text document and submit it directly to your coach for grading._

---

## Question 1: Control Flow Mechanics
You are processing an unstructured real-time stream of data items from a mock local system channel. You have no pre-determined method to discover total record lengths before execution, but your processor routine must halt instantly the moment an empty string payload ("") is encountered. Explain why a while loop design is structurally superior to a for loop setup for this exact architectural context.

### Answer
A while loop design is superior because you can build into the loop condition a state that causes the loop to automatically halt given an unknown length of data without inherently have to crawl through every element within the data. This means you do not have to consider breaking the loop within the loop's internal logic since this is already handled by the condition of the loop itself. As a result, you should have a slightly, or significantly - depending on the size of data - more efficient code block.

## Question 2: Memory Optimization & Expression Returns
Analyze the poorly structured evaluation script listed below. Refactor this block completely to strip out redundant local state variables, streamlining the execution logic to return expression evaluations directly to the caller:
```
def check_analyst_clearance(user_role):
    status = False
    if user_role == "Technical Analyst":
        status = True
    else:
        status = False
    return status
```

### Answer
Here is the refactored code:
```
def check_analyst_clearance(user_role):
    return user_role == "Technical Analyst"
```

In the above refactored code, I stripped out the local variable "status" and opted for a direct return statement within the if/else checks. Variables are ideal when a particular data or data set needs to remain accessible for multiple purposes. (i.e., DRY method) However, for simple processes where the data is only needed for a single operation, we should avoid storing it to prevent temp memory overload.

## Question 3: RAM Footprint Safeguards
When engineering an extraction script tasked with reading a standard system text file containing 50,000 deep log lines on hardware running limited memory overhead, what is the core architectural hazard of executing lines = file.readlines() instead of processing the source file instance line-by-line using standard pointer loops?

### Answer
The core architectural hazard is memory overload. By storing the full file in the variable "line" we could be requiring our limited memory to maintain a massive, and potentially overload level, amount of data. Even if we manage to not overload the memory upon storage, any operation against the lines variable is bound to take significantly longer and continue to add to the memory overhead burden.

## Question 4: JavaScript Array Processing
Write a functional, unassisted code snippet in pure vanilla JavaScript that accepts an array of unsorted numbers, strips away all odd entries, and passes the targeted product array back instantly without assigning it to any intermediate local tracking variable names.

### Answer
Here is the full code snippet I wrote:
```
const unsortedNumbers = [82, 14, 93, 4, 67, 31, 55, 78, 22, 49, 12, 88, 36, 71, 5, 60, 43, 99, 17, 26];

function removeOdds(nums){
    return nums.filter((num) => num % 2 === 0);
}

console.log(removeOdds(unsortedNumbers));
```

I started this code using a .reduce() method call instead of .filter(). I used a short-curcuit in the reduce function, but that was returning an array of even numbers *and* "false" values. I then remembered that the filter method was more direct in the return of expected values for simple evaluations. I did not use any code generation from AI for this and I did not copy and paste any snippets. However, I should be transparent and clarify that I used the following two resources to refresh me on .reduce() and .filter():
- [.reduce() MDN Docs](developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [.filter() MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

## Question 5: Engineering Self-Sufficiency Protocols
You run directly into an unhandled, cryptic execution anomaly while compiling code during your isolated morning technical training block. Outline three distinct, systematic diagnostic steps you can execute locally using standard native processes (such as terminal logs, explicit variable prints, or local debugging steps) prior to prompting an AI code generator or Copilot configuration for a direct answer.

### Answer
- **Step 1**: Terminal/Error log tracing
-- Summary: This step is the first part of the process. Where is the error currently throwing and what is the error trying to tell me.
-- The first part of this process is to find where the error is in my code. I scroll through the log statement and find the tracestack declaration of error in line:X column:Y. Once I have this, I can take a look and see if there is a middle-of-the road (obvious) error. If not, then...
-- I will proceed to then review the error trace stack. Sometimes, the error stack step 1 or 2 after the error for my specific code will help clarify, like declaring that the type passed to a lower-level function is not the expected type. Depending on the results here, if I cannot resolve the issue, or need more information, then I proceed to the next step below.
- **Step 2**: Break points & Early Exits (Component/Function Testing)
-- Summary: This step is the second part of the process. It is where I can gather more information on where the issue actually originates. While the error stack is helpful at finding the machines location of error, this often is not the origin when it comes to nested-function code structures. (e.g., Helper functions passing bad returns back up to the main function.)
-- The first step of this process is to go to where the machine is telling me there is an error. If the code segment is utilizing data from another resource, like a helper method or previously declared and mutated variable, then we may need to isolate that function or variable for specific testing, which is performed by adding a breakpoint, clipping out the code, introducing earliers calls/prints/console logs, or commenting out certains blocks - depending on the language being worked with. And, often this leads to the last step detailed below.
- **Step 3**: Print/Console Logging
-- Summary: This step is often the final stage of my general debugging process. In this stage, I explicitly push values, returns, and properties of these things to the surface by explicitly logging/printing them out. This brings the, often hidden, information tha the machine is working with out into the light.
-- As with the above steps, the first part of the process here is **location**. Once I have identified the variable, return, or function that is having an issue, I can introduce the language-specific method of surfacing the data being handled.
--- A key consideration here is that sometimes you want the raw data, but other times, you might want the properties of the data. For example, you might want to log out the data/return type to ensure that your program is being provided the right *kind* of data. (e.g., Function expects a double, but if being provided an integer. Your original console log prints out 20, but type of shows you that you are returning an int, not a double.)
- Generally, even if the above process does not allow me, personally, to eliminate the error, the combination of explicit error stack error, ultimate location of error in program, and the data/data properties at play allow me to first google the issue to find resources via documentation (e.g., MDN, W3 Schools) or community hubs (e.g., Stack Overflow). And, if all else fails, all of the information gathered allows me to better probe AI assistants for help, and better understand the response I get for ingestion and future application.