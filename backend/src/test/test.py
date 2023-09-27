import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import customtkinter
from customtkinter import *
from tkinter import messagebox

# The Collatz Conjecture.
# Take any integer and if 3n + 1 is applied to it, the number will eventually get to back to 1.

window = CTk()
mode = customtkinter.set_appearance_mode("light")
window.title("Collatz Conjecture")
window.geometry("800x550")
window.minsize(800, 550)
window.maxsize(800, 550)


def collatz_conjecture():
    number = int(entry_1.get())
    counter = 0
    num_list = [number]
    while number != 1:
        counter += 1
        if number % 2 == 0:
            number = number / 2
            num_list.append(number)
        else:
            number = number * 3 + 1
            num_list.append(number)
            if number == 1:
                break

    max_num = max(num_list)

    # Creating the line graph.
    fig = plt.Figure(figsize=(8.5, 4.75), dpi=100)
    ax = fig.add_subplot(111)

    plt.title("Collatz Conjecture")

    x_axis = []
    index = 0
    for num in num_list:
        index += 1
        x_axis.append(index)

    x = x_axis
    y = num_list

    ax.plot(x, y)

    canvas = FigureCanvasTkAgg(fig, master=window)
    canvas.draw()

    canvas.get_tk_widget().place(x=75, y=20)
    messagebox.showinfo("Info", f"Numbers: \n{num_list}\n\nHighest number: {max_num}\n\nCalculations: {counter}")


# Widgets

entry_1 = CTkEntry(window, width=400, height=60, corner_radius=10, border_width=0, font=("italic", 20, "bold"))
entry_1.place(x=200, y=420)

button_1 = CTkButton(window, text="Go", width=200, height=50, corner_radius=10, font=("italic", 25, "bold"),
                     command=collatz_conjecture)
button_1.place(x=300, y=490)

label_1 = CTkLabel(window, text="3n + 1", font=("italic", 150, "bold"))
label_1.place(x=200, y=50)

window.mainloop()