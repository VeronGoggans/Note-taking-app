content = "{\\rtf1\\ansi\\deff0{\\fonttbl{\\f0 Times New Roman;}}\\f0\\fs24 Hello, this is an RTF file.}"

with open("example.rtf", "w") as file:
    file.write(content)
