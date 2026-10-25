document.getElementById('year').textContent = new Date().getFullYear();

const chatPanel = document.getElementById('chat-panel');
const chatToggle = document.querySelector('.chat-toggle');
const chatClose = document.querySelector('.chat-close');
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

function setChatOpen(open) {
  chatPanel.hidden = !open;
  chatToggle.setAttribute('aria-expanded', String(open));
  if (open) chatInput.focus();
  else chatToggle.focus();
}

function addMessage(text, sender) {
  const message = document.createElement('div');
  message.className = `chat-message ${sender}-message`;
  message.textContent = text;
  chatMessages.append(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getReply(question) {
  const q = question.toLowerCase();
  if (/\b(ios|android|mobile|app|application)\b/.test(q)) {
    return 'Mobile app development is our first priority: thoughtful iOS and Android apps for both businesses and individual users. Full details will be shared at launch.';
  }
  if (/\b(ai|machine learning|automation|data|analytics)\b/.test(q)) {
    return 'The planned focus includes applied AI, machine learning, data analytics, and automation, alongside custom software and cloud solutions.';
  }
  if (/\b(web|website|portal|software|cloud|service|services|build|do|technology)\b/.test(q)) {
    return 'Silver Sync Labs is preparing work across custom software and cloud platforms, web experiences, AI and automation, mobile apps, and connected systems.';
  }
  if (/\b(contact|email|reach|project|quote|hire|talk)\b/.test(q)) {
    return 'We’d be glad to hear about your idea. Email your contact details and requirements to silversync.labs@gmail.com. The chat itself doesn’t collect or save enquiries.';
  }
  if (/\b(when|launch|ready|open)\b/.test(q)) {
    return 'The full website is still in preparation. There isn’t a launch date to share yet, but this page will be updated when the next chapter is ready.';
  }
  return 'Mobile apps are our first priority. I can also answer about software, AI, web experiences, and connected systems. What would you like to know?';
}

function sendQuestion(question) {
  const clean = question.trim();
  if (!clean) return;
  addMessage(clean, 'user');
  addMessage(getReply(clean), 'bot');
  if (/\b(ios|android|mobile|app|application|project|quote|hire|contact|email|reach|talk)\b/i.test(clean)) {
    const action = document.createElement('a');
    action.className = 'chat-email-link';
    action.href = 'mailto:silversync.labs@gmail.com?subject=Project%20enquiry%20-%20Silver%20Sync%20Labs';
    action.textContent = 'Share your requirements ↗';
    action.setAttribute('aria-label', 'Email your requirements to Silver Sync Labs');
    chatMessages.append(action);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

chatToggle.addEventListener('click', () => setChatOpen(chatPanel.hidden));
chatClose.addEventListener('click', () => setChatOpen(false));
chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  sendQuestion(chatInput.value);
  chatInput.value = '';
  chatInput.focus();
});
document.querySelectorAll('.chat-prompts [data-question]').forEach((button) => {
  button.addEventListener('click', () => sendQuestion(button.dataset.question));
});

