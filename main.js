let input = document.querySelector('input');
let btn = document.querySelector('button');
let container = document.querySelector('.chat-box');
async function chatWithTogetherAI(prompt) {
  isTyping = true
  
  let loading = document.createElement('div');
  loading.classList.add( 'message');
  loading.innerHTML = '<img src="https://media.tenor.com/cnb4G0hjQmwAAAAi/writing-loading.gif" alt="">'
  container.appendChild(loading)
  scrollToBottom()
  const API_URL = "https://api.together.xyz/v1/chat/completions";
  const API_KEY = "4887d284edc48f4ff85e0ba372bb4a054e92d037550478d48825f5263285cc7a";

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistralai/Mistral-7B-Instruct-v0.1",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
  console.log(data);
  
  loading.remove()
  
  let msgTxt = data.choices[0].message.content.split('')
  msgTxt.shift()
  let botWrapper = document.createElement('div');
  botWrapper.classList.add('bot', 'message');


  botWrapper.innerHTML = marked.parse(msgTxt.join('')); 
  container.appendChild(botWrapper);
  isTyping = false
  scrollToBottom()
}

function scrollToBottom() {
  container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
}

function fireMsg(params) {
  if (input.value.trim() !== '') {
    let userWrapper = document.createElement('div');
    userWrapper.classList.add('message', 'user');
    userWrapper.innerHTML = marked.parse(input.value);

    container.appendChild(userWrapper);
    scrollToBottom(); 

    chatWithTogetherAI(input.value);
    input.value = '';
  }
}
btn.addEventListener('click', () => {
fireMsg()
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    fireMsg()
  }
});
