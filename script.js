window.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('isLoggedIn')) {
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
    document.querySelector('.close-btn').addEventListener('click', function() {
        messageBox.classList.remove('show');
    });
    document.getElementById('logoutBtn').addEventListener('click', function(event) {
        event.preventDefault(); 
        // Clears login status
        localStorage.removeItem('isLoggedIn');
        // Redirect to the login page with a logout query parameter
        window.location.href = 'register.html?logout';
    });

    // Function to displays saved data in the page
    function displaySavedData() {
        var timetableList = document.getElementById('timetable-list');
        timetableList.innerHTML = '';
        // Retrieve saved data from localStorage.
        // Retrieve saved data from localStorage.
        var savedData = JSON.parse(localStorage.getItem('timetableData')) || [];
        savedData.forEach(function(item, index) {
            var li = document.createElement('li');
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
    function deleteSavedData(index) {
        var savedData = JSON.parse(localStorage.getItem('timetableData')) || [];
        savedData.splice(index, 1);
        localStorage.setItem('timetableData', JSON.stringify(savedData));
        displaySavedData();
    }
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
    displaySavedData();n
    document.getElementById('timetable-form').addEventListener('submit', function(event) {
        event.preventDefault(); 

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
        }, 10000); 
    });
});
