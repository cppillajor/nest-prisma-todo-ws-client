import { Manager, Socket } from 'socket.io-client';
let socket: Socket;
export const connectToServer = ( ) => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js');
    socket = manager.socket('/');
    addListeners();
}
const addListeners = () => {
    const clientsUl = document.querySelector('#clients-ul')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;
    const serverStatusLabel = document.querySelector('#server-status')!;
    socket.on('connect', () => {
        serverStatusLabel.innerHTML = 'connected';
    });
    socket.on('disconnect', () => {
        serverStatusLabel.innerHTML = 'disconnected';
    });
    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = '';
        clients.forEach( clientId => {
            clientsHtml += `
                <li>${ clientId }</li>
            `
        });
        clientsUl.innerHTML = clientsHtml;
    });
    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if( messageInput.value.trim().length <= 0 ) return;
        socket.emit('message-from-client', { 
            id: '1', 
            message: messageInput.value             
        });
        messageInput.value = '';
    });
    socket.on('message-from-server', ( payload: { fullName: string, message: any }) => {
        console.log(payload)
        const listTasks = payload.message;
        let taskString=' <br>';
        listTasks.forEach((task:any) => {
            taskString += ` 
            <b>Tarea:</b> ${task.name} |
            <b>Fecha:</b> ${task.dueBy} |
            <b>Username:</b> ${task.username} <br>
            
          `
        });
        console.log(payload.message);
        const newMessage = `

            <li>
                <strong>${ payload.fullName }</strong>
                <span>${ taskString }</span>
                
            </li>
        `;
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append( li );

    })


}