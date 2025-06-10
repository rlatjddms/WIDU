function initChatPopup() {
    const chatToggleBtn = document.getElementById("chat-toggle-btn");
    const chatPopup = document.getElementById("chat-popup");
    const chatCloseBtn = document.getElementById("chat-close-btn");
    const chatSendBtn = document.getElementById("chat-send-btn");
    const chatInput = document.getElementById("chat-input");
    const chatBody = document.getElementById("chat-body");

    if (!chatToggleBtn || !chatPopup) {
        console.warn("chat.js: 필요한 요소가 없습니다.");
        return;
    }

    chatToggleBtn.addEventListener("click", () => {
        chatPopup.style.display = "flex";
    });

    chatCloseBtn.addEventListener("click", () => {
        chatPopup.style.display = "none";
    });

    chatSendBtn.addEventListener("click", () => {
        const text = chatInput.value.trim();
        if (text) {
            const newMsg = document.createElement("div");
            newMsg.className = "message right";
            newMsg.textContent = text;
            chatBody.appendChild(newMsg);
            chatBody.scrollTop = chatBody.scrollHeight;
            chatInput.value = "";
        }
    });

    chatInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            chatSendBtn.click();
        }
    });
}
