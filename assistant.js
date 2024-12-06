const API_KEY = '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'; // Remplacez par votre clé API OpenAI

// Fonction pour gérer l'envoi du message
async function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return; // Ne rien faire si l'entrée est vide

    // Ajouter le message de l'utilisateur à l'écran
    addMessageToChat(userInput, "user-message");

    // Effacer l'entrée utilisateur
    document.getElementById("user-input").value = "";

    // Appel à l'API ChatGPT pour obtenir une réponse
    try {
        const botResponse = await getBotResponse(userInput);
        addMessageToChat(botResponse, "bot-message");
    } catch (error) {
        console.error("Erreur de l'API:", error);
        addMessageToChat("Désolé, une erreur s'est produite. Veuillez réessayer.", "bot-message");
    }
}

// Ajouter un message à la fenêtre de chat
function addMessageToChat(message, type) {
    const chatWindow = document.getElementById("chat-window");
    const messageElement = document.createElement("div");
    messageElement.className = `message ${type}`;
    messageElement.innerHTML = `<i class="fas ${type === "user-message" ? "fa-user" : "fa-robot"}"></i> ${message}`;

    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Descendre à la fin du chat
}

// Fonction pour obtenir la réponse du bot en appelant l'API OpenAI
async function getBotResponse(userMessage) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: userMessage }
            ],
            max_tokens: 150,
            temperature: 0.7
        })
    });

    if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();

    // Vérifier si la réponse est correcte
    if (data.choices && data.choices[0] && data.choices[0].message) {
        return data.choices[0].message.content.trim();
    } else {
        throw new Error("Réponse invalide de l'API OpenAI.");
    }
}

// Effacer la conversation
function clearChat() {
    const chatWindow = document.getElementById("chat-window");
    chatWindow.innerHTML = "";
}
