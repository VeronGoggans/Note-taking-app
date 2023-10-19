from datetime import datetime

# Define two dates as strings in DD-MM-YYYY format
date_str1 = '01-10-2023'
date_str2 = '19-10-2023'

# Parse the date strings into datetime objects
date1 = datetime.strptime(date_str1, '%d-%m-%Y')
date2 = datetime.strptime(date_str2, '%d-%m-%Y')

# Calculate the difference between the two dates
date_difference = date2 - date1

# Print the difference
print(f"The difference between date2 and date1 is {date_difference.days} days.")

# Get the current date
current_date = datetime.now()

# Format the current date as DD-MM-YYYY
date_str = current_date.strftime('%d-%m-%Y')

# Print the formatted date
print(date_str)
