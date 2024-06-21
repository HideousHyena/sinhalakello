let selectedPerson = null;
let messageCount = 0;
const responses = [
    "Hi there!",
    "How can I help you?",
    "That's interesting!",
    "Tell me more.",
    "I'm here to chat!",
    "What do you think?",
    "Let's continue.",
    "That sounds great!",
    "I'm not sure about that.",
    "Could you clarify?"
];

function selectPerson(name, image) {
    selectedPerson = { name, image };
    localStorage.setItem('selectedPerson', JSON.stringify(selectedPerson));
    window.location.href = 'chat.html';
}

window.onload = function() {
    if (window.location.pathname.endsWith('chat.html')) {
        selectedPerson = JSON.parse(localStorage.getItem('selectedPerson'));
        if (selectedPerson) {
            document.getElementById('chat-name').innerText = selectedPerson.name;
            document.getElementById('chat-dp').src = selectedPerson.image;
        }
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value;
    if (message.trim() === '') return;

    appendMessage('You', message, true);
    chatInput.value = '';
    messageCount++;

    if (messageCount >= 10) {
        showSubscriptionPrompt();
        return;
    }

    setTimeout(() => {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        appendMessage(selectedPerson.name, randomResponse, false);
    }, Math.random() * 4000 + 1000); // Typing animation delay between 1-5 seconds
}

function appendMessage(sender, message, isUser) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('my-2', 'p-2', 'rounded-lg', 'shadow-md');
    messageElement.classList.add(isUser ? 'bg-blue-100' : 'bg-gray-100');
    messageElement.innerText = `${sender}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showSubscriptionPrompt() {
    const chatBox = document.getElementById('chat-box');
    const promptElement = document.createElement('div');
    promptElement.classList.add('my-2', 'p-4', 'rounded-lg', 'bg-yellow-100', 'shadow-md', 'text-center');
    promptElement.innerHTML = `
        <p>To continue chatting, please subscribe!</p>
        <button onclick="showPaymentForm()" class="mt-2 p-2 bg-green-500 text-white rounded-lg">Subscribe Now</button>
    `;
    chatBox.appendChild(promptElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showPaymentForm() {
    const chatBox = document.getElementById('chat-box');
    const paymentForm = document.createElement('div');
    paymentForm.classList.add('my-2', 'p-4', 'rounded-lg', 'bg-yellow-100', 'shadow-md', 'text-center');
    paymentForm.innerHTML = `
        <p>Enter your card details:</p>
        <input type="text" id="card-number" placeholder="Card Number" class="p-2 border border-gray-300 rounded-lg mb-2">
        <input type="text" id="expiry-date" placeholder="Expiry Date" class="p-2 border border-gray-300 rounded-lg mb-2">
        <input type="text" id="cvv" placeholder="CVV" class="p-2 border border-gray-300 rounded-lg mb-2">
        <button onclick="saveCardDetails()" class="mt-2 p-2 bg-green-500 text-white rounded-lg">Save</button>
    `;
    chatBox.appendChild(paymentForm);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function saveCardDetails() {
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    if (cardNumber && expiryDate && cvv) {
        const cardDetails = { cardNumber, expiryDate, cvv };
        localStorage.setItem('cardDetails', JSON.stringify(cardDetails));
        alert('Card details saved successfully!');
    } else {
        alert('Please fill in all the details.');
    }
}
