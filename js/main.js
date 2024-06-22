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
        "කොහොමද ඉතිං...",
        "හායි!",
        "Hi!",
        "ඉතිං ඉති​ං",
        "ම්ම්ම්...",
        "mmmm...",
        "එහෙමද?",
        "ගෙවල් කොහෙද කිව්වෙ?",
        "මං නං මාතර...",
        "කම්මැලියි අනේ...",
        "වහිනවද ඔයාලට?",
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

        if (messageCount % 5 === 0) {
            redirectToURL('https://www.highrevenuenetwork.com/adgjr4xzu?key=06c94e063a3ea8840ab11db6a1ebe3c4');
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

    function redirectToURL(url) {
        window.location.href = url;
    }
});
