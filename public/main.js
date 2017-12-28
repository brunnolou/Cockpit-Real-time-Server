const ws = new WebSocket(document.location.origin.replace('http', 'ws'), 'refresh-protocol');

const root = document.getElementById('root');
const Messages = root.appendChild(document.createElement('pre'));
const Button = root.appendChild(document.createElement('button'));
Button.innerText = 'Send';

const messages = [];

// Connection opened.
ws.onopen = function onopen() {
  ws.send('Hello Server!');
};

// Send
Button.onclick = () => {
  ws.send('Button clicked');
};

// on receive a message.
ws.onmessage = function onmessage(evt) {
  const obj = JSON.parse(evt.data);

  messages.push(`<b>${new Date()}:</b><br />${JSON.stringify(obj, null, '  ')}`);

  Messages.innerHTML = messages
    .slice(0)
    .reverse()
    .join('<br /><hr /><br />');
};
