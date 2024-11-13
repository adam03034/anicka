
    // Chat Messages Configuration
    const messages = [
        { text: "Ahoj Anicka!", type: "sent", delay: 1000 },
        { text: "Mám pre teba prekvapko :D", type: "sent", delay: 2000 },
        { text: "Vieš aký je dnes deň?!", type: "sent", delay: 3000 },
        { text: "Je to tvoj špeciálny deň ;)", type: "sent", delay: 4000 },
        { text: "Všetko najlepšie k narodeninám! 🎉🎂", type: "sent", delay: 5000 },
        { text: "❤️", type: "sent", delay: 6000 },
        { text: "Klikni sem pre svoje prekvapenie... 🎁✨", type: "sent", delay: 7000, special: true }
    ];

    const chatContainer = document.querySelector('.chat-container');
    const typingIndicator = document.querySelector('.typing-indicator');
    const birthdayCard = document.querySelector('#birthday-card');
    const overlay = document.querySelector('.overlay');
    let currentMessageIndex = 0;

    // Chat Functions
    function showTyping() {
        typingIndicator.style.display = 'block';
        return new Promise(resolve => setTimeout(resolve, 1500));
    }

    function hideTyping() {
        typingIndicator.style.display = 'none';
    }

    function addMessage(message, index) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.type}`;
        messageDiv.textContent = message.text;
        messageDiv.style.animationDelay = `${index * 0.1}s`;
        
        if (message.special) {
            messageDiv.style.cursor = 'pointer';
            messageDiv.addEventListener('click', showEnvelope);
        }

        const timeDiv = document.createElement('div');
        timeDiv.className = 'time';
        const now = new Date();
        timeDiv.textContent = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

        const messageContainer = document.createElement('div');
        messageContainer.appendChild(messageDiv);
        messageContainer.appendChild(timeDiv);
        
        chatContainer.appendChild(messageContainer);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    async function displayMessages() {
        for (let i = 0; i < messages.length; i++) {
            await showTyping();
            hideTyping();
            addMessage(messages[i], i);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    function showEnvelope() {
        document.querySelector('.chat-container').style.display = 'none';
        document.querySelector('.typing-indicator').style.display = 'none';
        document.getElementById('envelope-container').style.display = 'block';
    }

    // Envelope Functions
    $(document).ready(function() {
        var envelope = $('#envelope');
        var btn_open = $("#open");
        var btn_reset = $("#reset");

        envelope.click(function() {
            open();
        });

        btn_open.click(function() {
            open();
        });

        btn_reset.click(function() {
            close();
            document.getElementById('envelope-container').style.display = 'none';
            document.querySelector('.chat-container').style.display = 'flex';
            document.querySelector('.typing-indicator').style.display = 'none';
        });

        $('.letter').click(function() {
            if(envelope.hasClass('open')) {
                birthdayCard.style.display = 'block';
                overlay.classList.add('show');
            }
        });

        $('#close-card, .overlay').click(function() {
            birthdayCard.style.display = 'none';
            overlay.classList.remove('show');
        });

        function open() {
            envelope.addClass("open").removeClass("close");
        }

        function close() {
            envelope.addClass("close").removeClass("open");
            birthdayCard.style.display = 'none';
            overlay.classList.remove('show');
        }
    });

    // Start the message sequence when the page loads
    window.addEventListener('load', displayMessages);
