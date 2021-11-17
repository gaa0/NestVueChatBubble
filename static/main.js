const app = new Vue({
  el: '#app',
  data: {
    title: '시그널 룸',
    name: '',
    text: '',
    messages: { A: '', B: '', C: '' },
    socket: null,
  },
  methods: {
    sendMessage() {
      if (this.validateInput()) {
        const message = {
          name: this.name,
          text: this.text,
        };
        this.socket.emit('msgToServer', message);
        this.text = '';
      }
    },
    receivedMessage(message) {
      //   this.messages.push(message);
      if (message.name === 'A') {
        app.messages.A = message.text;
      } else if (message.name === 'B') {
        app.messages.B = message.text;
      } else if (message.name === 'C') {
        app.messages.C = message.text;
      }
    },
    validateInput() {
      return this.name.length > 0 && this.text.length > 0;
    },
  },
  created() {
    this.socket = io('http://localhost:3000');
    this.socket.on('msgToClient', (message) => {
      this.receivedMessage(message);
    });
  },
});
