var ws = new WebSocket(location.origin.replace('http', 'ws'), "refresh-protocol");


const root = document.getElementById('root');
const Messages = root.appendChild(document.createElement('div'))
const Button = root.appendChild(document.createElement('button'))
Button.innerText = 'Send';

const messages = [];

// Connection opened.
ws.onopen = function (event) {
	ws.send('Hello Server!');
};

// Send
Button.onclick = () => {
	ws.send('Button clicked');
};

// on receive a message.
ws.onmessage = function(evt) {
	console.log(JSON.parse(evt.data));

	messages.push(evt.data);
	Messages.innerHTML = messages.join('<br />');
};
