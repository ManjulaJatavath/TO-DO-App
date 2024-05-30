window.addEventListener('DOMContentLoaded', function() {
    // Check if the user is logged in
    if (!localStorage.getItem('isLoggedIn')) {
        // Redirect to register page if not logged in
        window.location.href = 'register.html';
        return;
    }

    var params = new URLSearchParams(window.location.search);
    var messageBox = document.querySelector('.message-box');

    if (params.has('registered')) {
        messageBox.classList.add('show');
        messageBox.querySelector('.message').textContent = 'You are successfully registered!';
    } else if (params.has('logout')) {
        messageBox.classList.add('show');
        messageBox.querySelector('.message').textContent = 'You have been logged out.';
    }

    // Added event listener to close button
    document.querySelector('.close-btn').addEventListener('click', function() {
        messageBox.classList.remove('show');
    });

    // Function to displays saved data in the page
    function displaySavedData() {
        var timetableList = document.getElementById('timetable-list');
        // Clear existing data
        timetableList.innerHTML = '';
        // Retrieve saved data from localStorage.
        var savedData = JSON.parse(localStorage.getItem('timetableData')) || [];
        savedData.forEach(function(item, index) {
            var li = document.createElement('li');
            li.textContent = `Subject: ${item.subject}, Time: ${item.time}, Note: ${item.note}`;
            // Add buttons for update and delete operations
            var deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', function() {
                deleteSavedData(index);
            });
            var updateBtn = document.createElement('button');
            updateBtn.textContent = 'Update';
            updateBtn.addEventListener('click', function() {
                updateSavedData(index);
            });
            li.appendChild(deleteBtn);
            li.appendChild(updateBtn);
            timetableList.appendChild(li);
        });
    }

    // Function to delete saved data
    function deleteSavedData(index) {
        var savedData = JSON.parse(localStorage.getItem('timetableData')) || [];
        savedData.splice(index, 1);
        localStorage.setItem('timetableData', JSON.stringify(savedData));
        displaySavedData();
    }

    // Function to update saved data
    function updateSavedData(index) {
        var savedData = JSON.parse(localStorage.getItem('timetableData')) || [];
        var item = savedData[index];
        var updatedSubject = prompt('Enter updated subject:', item.subject);
        var updatedTime = prompt('Enter updated time:', item.time);
        var updatedNote = prompt('Enter updated note:', item.note);
        if (updatedSubject && updatedTime && updatedNote) {
            item.subject = updatedSubject;
            item.time = updatedTime;
            item.note = updatedNote;
            savedData[index] = item;
            localStorage.setItem('timetableData', JSON.stringify(savedData));
            displaySavedData();
        }
    }

    // Call the function to display saved data when the page loads.
    displaySavedData();
    document.getElementById('timetable-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Retrieve form data
        var subject = document.getElementById('subject').value;
        var time = document.getElementById('time').value;
        var note = document.getElementById('note').value;

        // Create object to hold form data
        var timetableData = {
            subject: subject,
            time: time,
            note: note
        };
        var existingData = JSON.parse(localStorage.getItem('timetableData')) || [];
        existingData.push(timetableData);
        localStorage.setItem('timetableData', JSON.stringify(existingData));

        displaySavedData();

        document.getElementById('subject').value = '';
        document.getElementById('time').value = '';
        document.getElementById('note').value = '';

        messageBox.classList.add('show');
        messageBox.querySelector('.message').textContent = 'Your timetable was successfully saved.';

        setTimeout(function() {
            messageBox.classList.remove('show');
        }, 10000); // 10000 milliseconds = 10 seconds
    });
});
