// @ts-nocheck

const johnSelectorBtn = document.querySelector('#john-selector')
const janeSelectorBtn = document.querySelector('#jane-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')
const btnBlacklist = document.querySelector('.btn-blacklist')
const btnReport = document.querySelector('.btn-report')

const messages = JSON.parse(localStorage.getItem('messagesDan')) || []

const createChatMessageElement = (message) => `
<div class="d-flex ${message.sender === 'Jane' ? 'justify-content-end' : 'justify-content-start'}">
  <div class="message ${message.sender === 'Jane' ? 'blue-bg' : 'gray-bg'}">
  <div class="message-sender">${message.sender === 'Jane' ? '' : 'Iqbal Revianda'}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
</div>
`

window.onload = () => {
  messages.forEach((message) => {
    if (message.text != undefined){
      chatMessages.innerHTML += createChatMessageElement(message)
    }
  })

  btnBlacklist.addEventListener('click', function(){
    alert('Iqbal Revianda masuk ke daftar blacklist')
  })
  
  btnReport.addEventListener('click', function(){
    alert('Iqbal Revianda masuk ke daftar report')
  })
}

let messageSender = 'Jane'

const updateMessageSender = (name) => {
  messageSender = name
  chatHeader.innerText = `${messageSender} chatting...`
  chatInput.placeholder = `Ketik Sesuatu`

  if (name === 'John') {
    johnSelectorBtn.classList.add('active-person')
    janeSelectorBtn.classList.remove('active-person')
  }
  if (name === 'Jane') {
    janeSelectorBtn.classList.add('active-person')
    johnSelectorBtn.classList.remove('active-person')
  }

  /* auto-focus the input field */
  chatInput.focus()
}


const sendMessage = (e) => {
  e.preventDefault()

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  }

  /* Save message to local storage */
  messages.push(message)
  localStorage.setItem('messagesDan', JSON.stringify(messages))

  /* Add message to DOM */
  chatMessages.innerHTML += createChatMessageElement(message)

  /* Clear input field */
  chatInputForm.reset()

  /*  Scroll to bottom of chat messages */
  chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

