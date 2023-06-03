// @ts-nocheck
const johnSelectorBtn = document.querySelector('#john-selector')
const janeSelectorBtn = document.querySelector('#jane-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')
const templateInputForm = document.querySelector('.template-input-form')
const templateInputJudul = document.querySelector('.template-input-judul')
const chatTemplateInput = document.querySelector('#chatTemplateInput')
const template = document.querySelector('.template')

const messages = JSON.parse(localStorage.getItem('messages')) || []

const createChatMessageElement = (message) => `
<div class="d-flex ${message.sender === 'John' ? 'justify-content-end' : 'justify-content-start'}">
  <div class="message ${message.sender === 'John' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender === 'John' ? '' : 'Dedy Setiawan, S.Kom., M.IT.'}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
</div>
`

const createTemplate = (message) => `
<div class="dropdown mb-3">
  <button type="button" style="color: #8D8BA7; font-weight:600; background: #EDF0F7;" class="btn" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
  ${message.judulTemplate} <img src="./assets/image/Arrow - Down 2.png" alt="">
  </button>
  <form style="background-color: #EDF0F7;" class="dropdown-menu p-4">
    <div class="mb-3">
      <p style="color: #5D5A88;">${message.template}</p>
    </div>
    <button id="btnTemplate" type="button" class="btn-testing btn " style="background-color: #004A8E; color:white;">Pakai Template</button>
  </form>
</div>
`

window.onload = () => {
  messages.forEach((message) => {
    if (message.text != undefined){
      chatMessages.innerHTML += createChatMessageElement(message)
    }

    if (message.template != undefined){
      template.innerHTML += createTemplate(message)
    }
    
  })
  const btnSatu = document.querySelector('.btn-satu')
  btnSatu.addEventListener('click', useTemplate)

  chatInputForm.addEventListener('submit', sendMessage)
templateInputForm.addEventListener('submit', saveTemplate)
}

let messageSender = 'John'

const updateMessageSender = (name) => {
  messageSender = name
  chatHeader.innerText = `${messageSender} chatting...`
  chatInput.placeholder = `Ketik Sesuatu`

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
  localStorage.setItem('messages', JSON.stringify(messages))

  /* Add message to DOM */
  chatMessages.innerHTML += createChatMessageElement(message)

  /* Clear input field */
  chatInputForm.reset()

  /*  Scroll to bottom of chat messages */
  chatMessages.scrollTop = chatMessages.scrollHeight
}


const saveTemplate = (e) => {
  e.preventDefault()
  const message = {
    judulTemplate: templateInputJudul.value,
    template: chatTemplateInput.value
  }

  /* Save message to local storage */
  messages.push(message)
  localStorage.setItem('messages', JSON.stringify(messages))

  template.innerHTML += createTemplate(message)
}

const useTemplate = (e) => {
  e.preventDefault()
  chatInput.value = "sadasdads"  
  chatMessages.scrollTop = chatMessages.scrollHeight
}
