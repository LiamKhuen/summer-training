# Use json module to aide proper data structure of imported data.
import json
# Capture JSON data fropm file and store for use
with open("system_logs_day-1.json", "r") as file:
    data = json.load(file)
# Define iteration variable
i = 0
# Define tracking variable using event ID. Using Event ID saves on storage, but might not be as ideal on time.
events = []

# Check that data access is correct
# print(data[i]["events"][1]["payload"]["rows"])

while True:
    if i >= len(data):
        break
    else:
        if (data[i]["events"][0]["payload"]["status"].lower() == "fail" or data[i]["events"][1]["payload"]["rows"] > 100):
            events.append(data[i]["id"])
            # Debugging check
            # print("We have added an event")
        # Debugging check
        # print("i = " + str(i))
        i+=1

print("The following Event IDs are failing or have excessive row counts: " + str(events))