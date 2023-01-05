const form = document.getElementById("form");
const reminderInput = document.getElementById("reminder");
const dateInput = document.getElementById("reminder-date");
const timeInput = document.getElementById("reminder-time");
const selectInput = document.getElementById("select-input");
const reminderBtn = document.getElementById("reminder-btn");
const reminderList = document.getElementById("reminder-list");
const clearStorage = document.getElementById("clear");

// Create the reminders array
let reminders = [];

// retrive the reminders from local storage 
if (localStorage.getItem('reminders')) {
    reminders = JSON.parse(localStorage.getItem("reminders"))
}


reminderBtn.addEventListener("click", myFunc);

// Event Listeners for the form
form.addEventListener("submit", (e) => {
  // Prevent the form from submitting  
    e.preventDefault();

    // Get the values from the form
    const reminder = reminderInput.value;
    const date = dateInput.value;
    const time = timeInput.value;
    const select = selectInput.value;

    // Create a new reminder object
    const new_reminder = {
        text: reminder,
        date: date,
        time: time,
        repeat: select
    };

    // Push the new reminder into the reminders array
    reminders.push(new_reminder);


    // Save the reminder array to localstorage
    localStorage.setItem("reminders-arr", JSON.stringify(reminders));
    
    // Clear the input field
    reminderInput.value = "";
    selectInput.value = "";
    dateInput.value = "";
    timeInput.value = "";

    // Create a list item and render it on the DOM
    localStorage.setItem("saved-reminder", JSON.stringify(reminders));
    const reminderItem = document.createElement("li");
    reminderItem.innerHTML = `
        <p>Reminder: ${new_reminder.text}</p>
        <p>Date & Time: ${new_reminder.date} ${new_reminder.time}</p>
        <p>Repeat: ${new_reminder.repeat}</p>
        <button type="button" class="delete-button">Delete</button>
    `
    // Render the reminderList to the DOM
    reminderList.appendChild(reminderItem);
});


function myFunc() {
    if((reminderInput.value === "") || (selectInput.value === "") || (dateInput.value === "") || (timeInput.value = "")) {
        alert("You must input something before adding a reminder");
        reminderList.style.display = "none"
    } else {
        reminderList.style.display = "block"
    }
};

// Event Listener for the Delete Btn
reminderList.addEventListener("click", (e) => {
    
    if (e.target.className === "delete-button") {
        // Get the index of the reminder from the array
        const index = Array.from(reminderList.children).indexOf(e.target.parentNode);

        // Remove the list from the DOM
        reminders.splice(index, 1);

        localStorage.setItem("reminders", JSON.stringify(reminders));

        e.target.parentNode.remove();
    }
});


clearStorage.addEventListener("click", () => {
    localStorage.clear();
    new_reminder = ""
})