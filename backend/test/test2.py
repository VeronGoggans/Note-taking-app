import json
# JSON data
data = {"key": "value", "numbers": [1, 2, 3, 4]}

# JSON with indentation
json_with_indent = json.dumps(data, indent=4)

# JSON without indentation
json_no_indent = json.dumps(data, indent=0)

print("Size of JSON with indentation:", len(json_with_indent))
print("Size of JSON without indentation:", len(json_no_indent))
