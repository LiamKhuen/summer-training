char_tracker = {}

with open("mock_data.txt", "rt") as file:
    for line in file:
        for char in line:
            char_tracker[char] = char_tracker.get(char, 0) + 1

print(char_tracker)