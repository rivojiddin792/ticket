let ticketCounter = 0;

const form = document.getElementById('form');
const dragZone = document.getElementById('dragZone');
const previewImage = document.querySelector('.preview');
const uploadBtn = document.querySelector('.button');
const removeBtn = document.querySelector('.remove');
const changeBtn = document.querySelector('.change');
const dragzoneBtn = document.querySelector('.dragZone-btn');
const imageStatus = document.getElementById('image-status');
const imageIcon = document.getElementById('image-icon');
const nameInput = document.getElementById('nameInput');
const nameStatus = document.getElementById('name-status');
const nameIcon = document.getElementById('name-icon');
const emailInput = document.getElementById('emailInput');
const emailStatus = document.getElementById('email-status');
const emailIcon = document.getElementById('email-icon');
const usernameInput = document.getElementById('usernameInput');
const usernameStatus = document.getElementById('username-status');
const usernameIcon = document.getElementById('username-icon');
const greeting = document.getElementById('greeting');
const announce = document.getElementById('announce');
const drag = document.getElementById('drag');

let image = false, name = false, email = false, git = false;

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dragZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
});

dragZone.addEventListener('dragover', () => {
    dragZone.classList.add('dragover');
});

dragZone.addEventListener('dragleave', () => {
    dragZone.classList.remove('dragover');
});

function showError(icon, status, content, input) {
    status.innerHTML = `${content}`;
    status.style.color = 'hsl(7, 71%, 60%)';
    icon.style.filter = 'invert(24%) sepia(89%) saturate(4887%) hue-rotate(0deg) brightness(105%) contrast(102%)';
    input.classList.add('invalid');
    previewImage.src = 'assets/images/icon-upload.svg';
}

function checkImage(file) {
    image = false;
    if (file && file.size < 500 * 1024) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
        image = true;
    }

    if (!image) {
        showError(imageIcon, imageStatus, 'File too large. Please upload a photo under 500KB.', dragZone);
        drag.style.display = 'block';
        dragzoneBtn.style.display = 'none';
    }
    else {
        imageStatus.innerHTML = `<p id="image-status">Upload your photo (JPG or PNG, max size: 500KB).</p>`;
        imageIcon.style.filter = '';
        dragZone.classList.remove('invalid');
        drag.style.display = 'none';
        dragzoneBtn.style.display = 'block';
    }
}

dragZone.addEventListener('drop', (e) => {
    dragZone.classList.remove('dragover');
    const files = e.dataTransfer.files;

    if (files.length) {
        checkImage(files[0]);
    }
});

function selectImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png, image/jpeg';

    input.onchange = () => {
        checkImage(input.files[0]);
    };

    input.click();
}

[uploadBtn, changeBtn].forEach(btn => {
    btn.addEventListener('click', () => selectImage());
});

function checkName(Name) {
    if (!Name) showError(nameIcon, nameStatus, 'Please enter your full name.', nameInput);
    else {
        name = true;
        nameInput.classList.remove('invalid');
        nameStatus.innerHTML = ``;
        nameIcon.src = "";
    }
}

function checkEmail(Email) {
    let error = '';
    if (!Email) {
        error = 'Please enter your email address.';
    }
    else if (!/^\S+@\S+\.\S+$/.test(Email)) {
        error = 'Please enter a valid email address.';
    }
    else email = true;

    if (!email) showError(emailIcon, emailStatus, error, emailInput);
    else {
        emailInput.classList.remove('invalid');
        emailStatus.innerHTML = "";
        emailIcon.src = "";
    }
}

function checkUsername(username) {
    let error = '';
    if (!username) {
        error = 'Please enter your GitHub username.';
    }
    else if (!/^[a-zA-Z0-9-]{1,39}$/.test(username)) {
        error = 'Invalid GitHub username format.';
    }
    else git = true;

    if (!git) showError(usernameIcon, usernameStatus, error, usernameInput);
    else {
        usernameInput.classList.remove('invalid');
        usernameIcon.src = "";
        usernameStatus.innerHTML = "";
    }
}

nameInput.addEventListener('blur', () => {
    name = false;
    checkName(nameInput.value.trim());
});

emailInput.addEventListener('blur', () => {
    email = false;
    checkEmail(emailInput.value.trim());
});

usernameInput.addEventListener('blur', () => {
    git = false;
    checkUsername(usernameInput.value.trim());
});

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!(image && name && email && git)) {
        alert("Please fill it all out!");
    }
    else {
        form.style.display = 'none';

        ticketCounter++;

        const ticketNumber = `#${ticketCounter.toString().padStart(4, '0')}`;

        const ticket = document.createElement('div');
        ticket.classList.add('generate-ticket');
        ticket.innerHTML = `
        <div class="first-section">
            <img src="assets/images/logo-mark.svg">
            <div style="display: flex; flex-direction: column; justify-content: space-around;">
                <h2>Coding Conf</h2>
                <p>Jan 31, 2025 / Austin, TX</p>
            </div>
        </div>
        <div class="second-section">
            <img src="${previewImage.src}" class="image-ticket">
            <div style="display: flex; flex-direction: column; justify-content: space-around;">
                <h2>${nameInput.value}</h2>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                    <img src="assets/images/icon-github.svg">
                    <p>${usernameInput.value}</p>
                </div>
            </div>
            <p class="ticket-number">${ticketNumber}</p>
        </div>`;
        document.querySelector('.main').appendChild(ticket);

        const imageTicket = ticket.querySelector('.image-ticket');
        imageTicket.addEventListener('click', () => {
            if (imageTicket.classList.contains('rotate')) {
                imageTicket.classList.remove('rotate');
            } else {
                imageTicket.classList.add('rotate');
            }
        });

        greeting.innerHTML = `Congrats, <span class="gradient-text">${nameInput.value}</span>! Your ticket is ready.`;
        announce.innerHTML = `We've emailed your ticket to <span style="color: hsl(7, 88%, 67%);">${emailInput.value}</span> and will send updates in the run up to the event.`;
    }
});

removeBtn.addEventListener('click', () => {
    previewImage.src = "assets/images/icon-upload.svg";
    dragzoneBtn.style.display = 'none';
    drag.style.display = 'flex';
});
