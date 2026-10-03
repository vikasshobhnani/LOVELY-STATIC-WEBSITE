const form = document.getElementById("nameForm");
const input = document.getElementById("nameInput");
const button = document.getElementById("submitBtn");
const message = document.getElementById("message");


// ======================================================
// ACCEPTED NAMES
// ======================================================

const acceptedNames = [
    "shikha",
    "shikhu",
    "love",
    "cheeku",
    "kuchupuchu"
];


// ======================================================
// CUTE MESSAGES
// ======================================================

const cuteMessages = [
    "Awww ❤️ I knew it was you!",
    "Correct answer! You are officially my favourite person. 💕",
    "Yes, that's the one! My cute little human. 🥰",
    "Welcome back, Shikhu. Your boyfriend missed you. ❤️",
    "Correct! Now come here and give me a hug. 🫶",
    "That's my girl. I knew you'd get it right. ❤️"
];


// ======================================================
// TEASING MESSAGES
// ======================================================

const teasingMessages = [
    "Nice try... 👀",
    "Okay, I saw that. Try again. 😂",
    "Again?! Really? 😭",
    "You're testing my patience now. 👀",
    "The button doesn't trust you anymore. 😂",
    "THE BUTTON IS RUNNING AWAY FROM YOU. 🏃‍♂️",
    "Okay madam, enough now. Enter the correct name. 😤❤️"
];


// ======================================================
// WRONG NAME MESSAGES
// ======================================================

const wrongMessages = [
    "Excuse me?! Who is she? 👀",
    "Hmm... I don't recognize this person. Try again. 😤",
    "Nice try. I definitely saw that. 👀",
    "Wrong answer, madam. 😂",
    "Who allowed you to type THAT name? 😭",
    "You really thought I wouldn't notice? 😂"
];


// ======================================================
// VARIABLES
// ======================================================

let buttonIsRunning = false;

let wrongAttempts = 0;


// ======================================================
// NORMALIZE NAME
// ======================================================

function normalizeName(name) {

    return name
        .trim()
        .toLowerCase();

}


// ======================================================
// CHECK NAME
// ======================================================

function isAcceptedName(name) {

    return acceptedNames.includes(
        normalizeName(name)
    );

}


// ======================================================
// RANDOM MESSAGE
// ======================================================

function randomMessage(messages) {

    const index = Math.floor(
        Math.random() * messages.length
    );

    return messages[index];

}


// ======================================================
// RESET BUTTON
// ======================================================

function resetButton() {

    button.style.left = "50%";

    button.style.top = "0";

    button.style.transform = "translateX(-50%)";

}


// ======================================================
// MOVE BUTTON
// ======================================================

function moveButton() {

    const area = document.querySelector(".button-area");

    if (!area) {
        return;
    }

    const areaWidth = area.clientWidth;
    const areaHeight = area.clientHeight;

    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;

    const maxX = Math.max(
        0,
        areaWidth - buttonWidth
    );

    const maxY = Math.max(
        0,
        areaHeight - buttonHeight
    );

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
    button.style.transform = "none";

}


// ======================================================
// WRONG NAME
// ======================================================

function activateTeasingMode() {

    wrongAttempts++;

    buttonIsRunning = true;

    if (wrongAttempts <= teasingMessages.length) {

        message.textContent =
            teasingMessages[wrongAttempts - 1];

    } else {

        message.textContent =
            randomMessage(wrongMessages);

    }

    if (wrongAttempts >= 2) {

        moveButton();

    }

}


// ======================================================
// INPUT CHANGE
// ======================================================

input.addEventListener("input", function () {

    const name = normalizeName(input.value);

    if (!name) {

        buttonIsRunning = false;

        wrongAttempts = 0;

        resetButton();

        message.textContent = "";

        return;

    }

    if (isAcceptedName(name)) {

        buttonIsRunning = false;

        wrongAttempts = 0;

        resetButton();

        message.textContent = "";

    }

});


// ======================================================
// MOUSE - BUTTON RUNS AWAY
// ======================================================

button.addEventListener("mouseenter", function () {

    if (!buttonIsRunning) {
        return;
    }

    message.textContent =
        randomMessage(wrongMessages);

    moveButton();

});


// ======================================================
// TOUCH - MOBILE
// ======================================================

button.addEventListener("touchstart", function (event) {

    if (!buttonIsRunning) {
        return;
    }

    event.preventDefault();

    message.textContent =
        randomMessage(wrongMessages);

    moveButton();

});


// ======================================================
// FORM SUBMIT
// ======================================================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = normalizeName(input.value);


    // Empty name

    if (!name) {

        message.textContent =
            "Hey! You have to enter your name first. 😌";

        return;

    }


    // Correct name

    if (isAcceptedName(name)) {

        buttonIsRunning = false;

        wrongAttempts = 0;

        showProposalPage();

        return;

    }


    // Wrong name

    activateTeasingMode();

});


// ======================================================
// PROPOSAL PAGE
// ======================================================

function showProposalPage() {

    document.body.innerHTML = `

        <div class="proposal-page">

            <div class="proposal-card">

                <div class="proposal-heart">
                    ❤️
                </div>

                <h1>
                    Okay... I have something to tell you.
                </h1>

                <p class="proposal-intro">
                    I could have written a normal message,
                    but you know me... I wanted to make
                    this a little special.
                </p>

                <p class="proposal-text">
                    Somewhere along the way,
                    you became much more than
                    just a person I love.
                </p>

                <p class="proposal-text">
                    You became the person I want to
                    laugh with, annoy every day,
                    make memories with,
                    and come back to every single time.
                </p>

                <p class="proposal-text">
                    I don't know exactly what the future
                    will look like, but I know who I want
                    beside me while I figure it out.
                </p>

                <h2>
                    Shikha, will you be mine? ❤️
                </h2>

                <div class="proposal-buttons">

                    <button
                        type="button"
                        id="yesButton">
                        YES ❤️
                    </button>

                    <button
                        type="button"
                        id="absolutelyButton">
                        ABSOLUTELY YES 🥹
                    </button>

                </div>

            </div>

        </div>
    `;


    // Get the newly created buttons

    const yesButton =
        document.getElementById("yesButton");

    const absolutelyButton =
        document.getElementById("absolutelyButton");


    // Add click events

    yesButton.addEventListener(
        "click",
        showFinalPage
    );

    absolutelyButton.addEventListener(
        "click",
        showFinalPage
    );

}


// ======================================================
// FINAL PAGE
// ======================================================

function showFinalPage() {

    document.body.innerHTML = `

        <div class="proposal-page">

            <div class="proposal-card">

                <div class="proposal-heart">
                    ❤️
                </div>

                <h1>
                    I AM YOURS ❤️
                </h1>

                <p class="proposal-text">
                    And you are mine. 🥹
                </p>

                <p class="proposal-text">
                    No matter where life takes us,
                    I want to keep choosing you,
                    every single day.
                </p>

                <p class="proposal-text">
                    My favourite person.<br>
                    My favourite smile.<br>
                    My favourite everything. ❤️
                </p>

                <h2>
                    I love you, Shikhu. ❤️
                </h2>

                <div class="big-heart">
                    ❤️
                </div>

            </div>

        </div>
    `;

}
