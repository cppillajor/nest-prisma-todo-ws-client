import { connectToServer } from './socket-client';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>    
    <br/>
    <span id="server-status">offline</span>
    <ul id="clients-ul"></ul>
    <form id="message-form">
      <input placeholder="Task" id="message-input" />
    </form>
    <h3>Task</h3>
    <ul id="messages-ul"></ul>
  </div>
`
connectToServer( );
