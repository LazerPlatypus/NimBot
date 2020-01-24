module.exports = {
    name: 'send-text',
    description: 'testing a description',
    author: 'sear',
    title: '',
    text: '',

    clearMessage() {
        this.color = [0, 153, 255];
        this.author = '';
        this.title = '';
        this.text = '';
    },
    setAuthor(authorText) {
        this.author = authorText;
    },
    setTitle(title) {
        this.title = title;
    },
    addText(text) {
        this.text += text;
    },
    sendMessage(target){
        const Discord = require('discord.js');
    }
};