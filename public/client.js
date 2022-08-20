const socket = io('http://localhost:3000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container"
);

var audio = new Audio('ting.mp3');
function append(message , position){
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
   messageElement.classList.add('message');
   messageElement.classList.add(position);
   messageContainer.append(messageElement)
   if(position=='left'){
    audio.play();
   }
   scrollToBottom();
  
    
}
const Name = prompt("Enter Your Name to Join");
//recieved from server when user connected to server
//how to check --- see new-user-joined is same..broadcast.emit function ke name same hone chaiye waha se broadcast.emit hoga server ki taraf se  
socket.emit('new-user-joined', Name);

//jab server pe user-joined function gaya to server apna kaam karega ok...that is to append the msg
socket.on('user-joined', (name)=>{
    append(`${name} joined the chat` ,'right')
    scrollToBottom();
})



//abb sever pe  recieve wala function gaya to append apna kaam karega
socket.on('receive' , data =>{
    append(`${data.name}: ${data.message}` , 'left');
    scrollToBottom();
   
} )


//on disconnected
socket.on('left', name =>{
    append(`${name} left the chat`, 'right')
    scrollToBottom();
})




//jab bhi koi form submit kare matlab messsage ko chat area mein append kare
form.addEventListener('submit',(e)=>{
   //page does not reload
   e.preventDefault();
   const message = messageInput.value;
   append(`You: ${message}` , 'right');
   socket.emit('send',message);
   messageInput.value = ''
   
})

function scrollToBottom() {
    messageContainer.scrollTop = messageContainer.scrollHeight
}
