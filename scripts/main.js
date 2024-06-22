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
    updateChatHeader();
    window.location.href = 'chat.html';
}

function updateChatHeader() {
    if (selectedPerson) {
        document.getElementById('chat-name').innerText = selectedPerson.name;
        document.getElementById('chat-dp').src = selectedPerson.image;
    }
}

window.onload = function() {
    if (window.location.pathname.endsWith('chat.html')) {
        selectedPerson = JSON.parse(localStorage.getItem('selectedPerson'));
        updateChatHeader();
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

    showTypingIndicator();

    setTimeout(() => {
        hideTypingIndicator();
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        appendMessage(selectedPerson.name, randomResponse, false);
    }, Math.random() * 4000 + 1000); // Random delay between 1-5 seconds
}

function appendMessage(sender, message, isUser) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'shadow-md');
    messageElement.classList.add(isUser ? 'user' : 'bot');
    messageElement.innerText = message;

    // Adjust bubble width based on message length
    const messageLength = message.length;
    if (messageLength < 10) {
        messageElement.style.width = `${messageLength * 10 + 50}px`;
    } else {
        messageElement.style.width = 'auto';
    }

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTypingIndicator() {
    document.getElementById('typing-indicator').classList.remove('hidden');
}

function hideTypingIndicator() {
    document.getElementById('typing-indicator').classList.add('hidden');
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function showSubscriptionPrompt() {
    const chatBox = document.getElementById('chat-box');
    const promptElement = document.createElement('div');
    promptElement.classList.add('message', 'p-4', 'rounded-lg', 'bg-yellow-100', 'shadow-md', 'text-center');
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
    paymentForm.classList.add('message', 'p-4', 'rounded-lg', 'bg-yellow-100', 'shadow-md', 'text-center');
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
        alert('Dummy card details saved locally.');
    } else {
        alert('Please fill in all the details.');
    }
}

function displaySavedCardDetails() {
    const savedCardDetails = localStorage.getItem('cardDetails');
    if (savedCardDetails) {
        const cardDetails = JSON.parse(savedCardDetails);
        // Display or use card details as needed in your application
        console.log(cardDetails); // Example: Log to console
    } else {
        console.log('No card details saved.');
    }
}

