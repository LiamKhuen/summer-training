char_tracker = {}

with open("mock_data-day_2.csv", "r") as file:
    tokens = file.readline().strip().split(",")
    for char in tokens:
        if char:
            char_tracker[char] = char_tracker.get(char, 0) + 1

print(char_tracker)