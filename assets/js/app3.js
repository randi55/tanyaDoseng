// @ts-nocheck
let index = 0
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

const messages = JSON.parse(localStorage.getItem('messagesDan')) || []

const createChatMessageElement = (message) => `
<div class="d-flex ${message.sender === 'John' ? 'justify-content-end' : 'justify-content-start'}">
  <div class="message ${message.sender === 'John' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender === 'John' ? '' : 'Daniel Arsa, S.Kom., M.S.I'}</div>
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
    <button id="btnTemplate" type="button" class="btn-baru${index} btn-testing btn " style="background-color: #004A8E; color:white;">Pakai Template</button>
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

  const btnDua = document.querySelector('.btn-dua')
  btnDua.addEventListener('click', useTemplateDua)
  
  const btnTiga = document.querySelector('.btn-tiga')
  btnTiga.addEventListener('click', useTemplateTiga)
  
  const btnEmpat = document.querySelector('.btn-empat')
  btnEmpat.addEventListener('click', useTemplateEmpat)

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
  localStorage.setItem('messagesDan', JSON.stringify(messages))

  /* Add message to DOM */
  chatMessages.innerHTML += createChatMessageElement(message)

  /* Clear input field */
  chatInputForm.reset()

  /*  Scroll to bottom of chat messages */
  chatMessages.scrollTop = chatMessages.scrollHeight
}


const saveTemplate = (e) => {
  index++
  e.preventDefault()
  const message = {
    judulTemplate: templateInputJudul.value,
    template: chatTemplateInput.value
  }

  /* Save message to local storage */
  messages.push(message)
  localStorage.setItem('messages', JSON.stringify(messages))

  template.innerHTML += createTemplate(message)

  const btnBaru = document.querySelector(`.btn-baru${index}`)
  btnBaru.addEventListener('click', function(e){
    e.preventDefault()
    chatInput.value = chatTemplateInput.value
  })
}

const useTemplate = (e) => {
  e.preventDefault()
  chatInput.value = "Assalamualaikum warahmatullahi wabarakatuh, Selamat siang Pak, mohon maaf mengganggu waktunya. Saya Iqbal Revianda dengan NIM F1E121049 Mahasiswa Prodi Sistem Informasi. Izin mengkonfirmasi jadwal kelas Sistem Informasi Manajemen, untuk pertemuan minggu ini apakah dilakukan secara online atau offline pak? Atas perhatian Bapak Saya ucapkan terimakasih"  
  chatMessages.scrollTop = chatMessages.scrollHeight
}

const useTemplateDua = (e) => {
  e.preventDefault()
  chatInput.value = "Assalamualaikum Wr. Wb. Selamat pagi, mohon maaf menganggu waktunya Pak, sebelumnya izin memperkenalkan diri nama saya Iqbal Revianda, mahasiswa Sistem Informasi. Maksud saya menghubungi bapak untuk izin besok siang nanti tidak bisa mengikuti kelas mata kuliah Sistem Informasi Manajemen dikarenakan sedang sakit demam sehingga tidak bisa beraktivitas seperti biasanya. Terima kasih atas perhatian Bapak, semoga Bapak sehat selalu. Wassalamualaikum Wr. Wb."  
  chatMessages.scrollTop = chatMessages.scrollHeight
}

const useTemplateTiga = (e) => {
  e.preventDefault()
  chatInput.value = "Assalamu'alaikum. Selamat Pagi Pak. Saya Iqbal Revianda dengan nim F1E121049 mahasiswa jurusan Sistem Informasi angkatan 2021. Saya sudah selesai mengisi KRS online untuk semester 4 tahun ajaran 2022/2023, Pak. Mohon Bapak untuk menyetujui KRS saya"  
  chatMessages.scrollTop = chatMessages.scrollHeight
}

const useTemplateEmpat = (e) => {
  e.preventDefault()
  chatInput.value = "Assalamualaikum Pak, maaf mengganggu waktunya. Saya Iqbal Revianda, mahasiswa Sistem Informasi dengan NIM F1E121049. Saya bermaksud untuk bimbingan skripsi dengan Bapak pekan ini, kira kira Bapak berkenan di hari apa dan jam berapa ya? Terima kasih banyak atas perhatian dan jawabannya Pak."  
  chatMessages.scrollTop = chatMessages.scrollHeight
}