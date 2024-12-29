// Animation
var loginBTN = document.getElementById("login");
var signupBTN = document.getElementById("signup");
var BTN = document.getElementById("btn");
var signupTitle = document.getElementById("signup-title");
var loginTitle = document.getElementById("login-title");
const changeColor = document.getElementById("signup-text-change");
const changeColor2 = document.getElementById("login-text-change");
function signup() {
    loginBTN.style.left = "-400px";
    signupBTN.style.left = "50px";
    BTN.style.left = "110px";
    signupTitle.style.left = "0px";
    loginTitle.style.left = "-400px";
    signupTitle.style.visibility = "visible";
    changeColor2.style.color = "#3499D1";
    changeColor.style.color = "white";
}

function login() {
    loginBTN.style.left = "50px";
    signupBTN.style.left = "450px";
    BTN.style.left = "0px";
    signupTitle.style.left = "300px";
    loginTitle.style.left = "0";
    changeColor2.style.color = "white";
    changeColor.style.color = "#3499D1";
}

//Pop Up

function popUp() {
    var popup = document.getElementById("popup");
    popup.classList.toggle("active");
};


// duplicate card
let currentNumber = 5; 

function addCard() {
    var original = document.getElementById("duplicate-div");
    var clone = original.cloneNode(true);

    currentNumber++;

    // Update the number in the new card
    const newNumberDiv = clone.querySelector("#number-change");
    newNumberDiv.textContent = currentNumber;
    newNumberDiv.id = ""; // Remove the ID to avoid duplicates

    // Update the IDs for the input fields
    const termInput = clone.querySelector("#flash-term-5");
    const defInput = clone.querySelector("#flash-def-5");

    termInput.id = `flash-term-${currentNumber}`;
    defInput.id = `flash-def-${currentNumber}`;

    // Append the cloned card to the container
    document.getElementById("flash-card-gen-whole").appendChild(clone);
} 
// Title's change/flash cards
function flashCard() {
    // Title change input
    const titleInput = document.getElementById('title-input').value;
    localStorage.setItem('flash-card-title', titleInput);

    const subjectInput = document.getElementById('subject-input').value;
    localStorage.setItem('flash-card-name', subjectInput);

    // Flash cards input
    let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

    // loops through cards and adds new id
    for (let i = 1; i <= currentNumber; i++) {
        const term = document.getElementById(`flash-term-${i}`).value;
        const definition = document.getElementById(`flash-def-${i}`).value;

        // Make sure no blank card gets pushed
        if (term !== '' && definition !== '') {
            flashcards.push({ term, definition });

            // Clear the input fields after adding to flashcards
            document.getElementById(`flash-term-${i}`).value = '';
            document.getElementById(`flash-def-${i}`).value = '';
        }
    }

    localStorage.setItem('flashcards', JSON.stringify(flashcards));

   
}

//Flash Card Title change output
window.onload = function() {
    const savedTitle = localStorage.getItem('flash-card-title');
    if (savedTitle) {
        document.getElementById('flash-card-title').textContent = savedTitle;
    }

    const savedSubject = localStorage.getItem('flash-card-name');
    if (savedSubject) {
        document.getElementById('flash-card-name').textContent = savedSubject;
    }

    // Add this part to ensure the flashcards flip when clicked
    document.getElementById('flash-card-paragraph').addEventListener('click', () => {
        document.getElementById('flash-card-paragraph').classList.toggle('flipped');
    });

    // Other onload functionality (e.g., displaying flashcards)
    if (flashcards.length > 0) {
        displayFlashcard();
    } else {
        alert('No flashcards available. Please create some first.');
    }
};
//Flash Cards output
const flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];    
let numerator = 1; 
let currentIndex = 0;
let denominator = flashcards.length;

const flashCardAmount = document.getElementById('flash-card-amount');
const incrementButton = document.getElementById('forward-arrow');
const decrementButton = document.getElementById('back-arrow');

function displayFlashcard() {
    if (flashcards.length === 0) return;
    document.getElementById('flash-card-paragraph').classList.remove('flipped');
    document.getElementById('term').textContent = flashcards[currentIndex].term;
    document.getElementById('definition').textContent = flashcards[currentIndex].definition;
    flashCardAmount.textContent = `${numerator}/${denominator}`;
}

function increment() {
    currentIndex = (currentIndex + 1) % flashcards.length;
    numerator = currentIndex + 1;
    displayFlashcard();
}

function decrement() {
    currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
    numerator = currentIndex + 1;
    displayFlashcard();
}

incrementButton.addEventListener('click', increment);
decrementButton.addEventListener('click', decrement);

// // Clear flashcards function
// function clearAllFlashCards() {
//     // Remove flashcards from localStorage
//     localStorage.removeItem('flashcards');

//     // Reset the numerator and denominator
//     numerator = 0;
//     denominator = 0;
//     flashCardAmount.textContent = `${numerator}/${denominator}`;

//     // Clear the flashcard display
//     document.getElementById('term').textContent = '';
//     document.getElementById('definition').textContent = '';
//     document.getElementById('flash-card-paragraph').classList.remove('flipped');

//     alert('All flashcards have been cleared.');
// }
// clearAllFlashCards()
// // Attach to a button or call directly
// document.getElementById('clear-flashcards').addEventListener('click', clearAllFlashCards);
// console.log(localStorage.getItem('flashcards'));

