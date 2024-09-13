import React, { useState, useEffect } from 'react';
import { Bell, Info, Mic, Paperclip, Phone, Search, Send, ThumbsUp, Video, ArrowLeft } from 'lucide-react';
import HeaderPublic from '../../partials/HeaderPublic';
import { getChats, getConversacion, enviarMensaje } from '../../../services/ClienteServices'
import { getChatsJe, getConversacionJe, enviarMensajeJe } from '../../../services/jefeServices';

import { jwtDecode } from 'jwt-decode';


const Avatar = ({ src, alt, fallback }) => (
  <div className="avatar">
    <img src={src} alt={alt} onError={(e) => {
      e.target.onerror = null;
      e.target.src = `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' width='40' height='40'%3E%3Crect width='40' height='40' fill='%23cccccc'/%3E%3Ctext x='50%25' y='50%25' font-size='20' text-anchor='middle' alignment-baseline='middle' font-family='monospace, sans-serif' fill='%23ffffff'%3E${fallback}%3C/text%3E%3C/svg%3E`;
    }} />
  </div>
);

const Button = ({ onClick, children, className }) => (
  <button onClick={onClick} className={`button ${className || ''}`}>
    {children}
  </button>
);

const Input = ({ placeholder, value, onChange, className }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`input ${className || ''}`}
  />
);

export default function Component() {
  const [chats, setChats] = useState([
    { id: 1, name: "Ivan Robayo", lastMessage: "Reaccionó 😀 a tu mensaje", time: "7 h", messages: [] },
    { id: 2, name: "سي سي ستيفن", lastMessage: "epa bro haci es buena", time: "8 h", messages: [] },
    { id: 3, name: "Jonatan Serna", lastMessage: "Ya salgo san", time: "12 h", messages: [] },
    { id: 4, name: "Marketplace", lastMessage: "6 mensajes nuevos", time: "2 d", unread: 6, messages: [] },
    { id: 5, name: "Andres Munoz", lastMessage: "Ush Manito No Se Cuando Pu...", time: "2 d", messages: [] },
  ]);
const [logueado, setLogueado] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setLogueado(decoded);
    }
  }, []);

  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {

    const fetchChats = async () => {
      try {
        if (!logueado?.id) return;
  
        let response;
        let data;
  
        if (logueado.role === 'jefesala') {
          response = await getChatsJe(logueado.id);
        } else {
          response = await getChats(logueado.id);
        }
  
        data = response.data;
  
        // Crear un mapa para agrupar las conversaciones únicas
        const chatMap = new Map();
  
        data.forEach(chat => {
          // Identifica si el usuario logueado es el emisor o el receptor
          const isEmisor = chat.emisor === logueado.id;
          const isReceptor = chat.receptor === logueado.id;
  
          // Clave única para la conversación
          const otherUserId = isEmisor ? chat.receptor : chat.emisor;
          const key = `${Math.min(chat.emisor, chat.receptor)}-${Math.max(chat.emisor, chat.receptor)}`;
  
          if (chatMap.has(key)) {
            // Agregar el mensaje a la conversación existente
            chatMap.get(key).messages.push(chat.contenido);
          } else {
            // Crear una nueva conversación
            chatMap.set(key, {
              id: otherUserId,
              name: isEmisor
                ? `${chat.receptorUser.nombre} ${chat.receptorUser.apellido}`
                : `${chat.emisorUser.nombre} ${chat.emisorUser.apellido}`,
              lastMessage: chat.contenido,
              timestamp: new Date(chat.createdAt).toDateString(), // Formato de hora
              messages: [chat.contenido],
            });
          }
        });
  
        // Convertir el mapa a un array para actualizar el estado
        setChats(Array.from(chatMap.values()));
        console.log(Array.from(chatMap.values()), "desde el useEffect");
  
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
  
    fetchChats();

  }, [selectedChat, logueado?.id]);

  useEffect(() => {

    if (!selectedChat) return;

    const fetchMessages = async () => {
      try {
        let response;
        let data;
        if (logueado.role === 'cliente') {
          response = await getConversacion(logueado.id, selectedChat);
          data = response.data;
        }
        else{
          response = await getConversacionJe(logueado.id, selectedChat);
          data = response.data;
        }
        // Ordenar los mensajes del más reciente al más antiguo
        const sortedMessages = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        console.log(sortedMessages);
  
        // Actualizar el estado de los chats con los mensajes obtenidos
        setChats(prevChats => prevChats.map(chat => {
          if (chat.id === selectedChat) {
            // Mapear los mensajes con la distinción del emisor
            const newMessages = sortedMessages.map(msg =>  (
              {
              id: msg.id || Date.now() + Math.random(), // Generar ID único si no existe
              sender: msg.emisor === logueado.id ? 'user' : 'other', // Determinar si el mensaje es del usuario o del otro
              content: msg.contenido,
              timestamp: new Date(msg.createdAt),
            }
          ))
            return {
              ...chat,
              messages: [...newMessages, ...chat.messages], // Añadir nuevos mensajes al principio
              lastMessage: newMessages.length > 0 ? newMessages[0].content : chat.lastMessage,
              time: 'Ahora',
            };
         
          }
          return chat;
        }));
      } catch (error) {
        console.error('Error al obtener los mensajes:', error);
      }
    };
    fetchMessages();
  }, [selectedChat, logueado?.id]);

   const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedChat) {
      try {
        if (logueado.role === 'cliente') {
          await enviarMensaje({
            emisor: logueado.id,
            receptor: selectedChat,
            contenido: newMessage,
            fechaEnvio: new Date(),
          });
        } else{
          await enviarMensajeJe({
            emisor: logueado.id,
            receptor: selectedChat,
            contenido: newMessage,
            fechaEnvio: new Date(),
          });
        }
        // Send message to API

        // Update local chat state
        setChats(prevChats => {
          return prevChats.map(chat => {
            if (chat.id === selectedChat) {
              const userMsg = {
                id: Date.now(),
                sender: 'user',
                content: newMessage,
                timestamp: new Date(),
              };
              return {
                ...chat,
                messages: [...chat.messages, userMsg],
                lastMessage: userMsg.content,
                time: 'Ahora'
              };
            }
            return chat;
          });
        });
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
 
  const currentChat = chats.find(chat => chat.id === selectedChat);
  const renderChatList = () => (
    <div className="chat-list">
      <div className="chat-list-header">
        <h1>Chats</h1>
      </div>
      <div className="chat-list-search">
        <Input placeholder="Buscar Contacto " />
      </div>
      <div className="chat-list-items">
        {chats.map(chat =>{  return(
          <div
            key={chat.id }
            className={`chat-item ${selectedChat === chat.id ? 'active' : ''}`}
            onClick={() => setSelectedChat(chat.id)}
          >
            <Avatar src={`/placeholder-avatar-${chat.id}.jpg`} alt={chat.name} fallback={chat.name.substring(0, 2)} />
            <div className="chat-item-info">
              <div className="chat-item-name-time">
                <span className="chat-item-name">{chat.name}</span>
                <span className="chat-item-time">{chat.time}</span>
              </div>
              <p className="chat-item-last-message">{chat.lastMessage}</p>
            </div>
            {chat.unread && (
              <span className="chat-item-unread">{chat.unread}</span>
            )}
          </div>
        )}  )}
      </div>
    </div>
  );

  const renderChatMessages = () => (
    <div className="chat-messages">
      <div className="chat-messages-header">
        {isMobileView && (
          <Button onClick={() => setSelectedChat(null)} className="back-button">
            <ArrowLeft size={24} />
          </Button>
        )}
        <div className="chat-messages-header-info">
          <Avatar src={`/placeholder-avatar-${selectedChat}.jpg`} alt={currentChat?.name} /* fallback={currentChat?.name.substring(0, 2)} */ />
          <div>
            <h2>{currentChat?.name}</h2>
          </div>
        </div>
        
      </div>
      <div className="chat-messages-list">
        {currentChat?.messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.sender === 'user' ? 'user' : 'other'}`}
          >
            <div className="message-content">
              <p>{msg.content}</p>
              <span className="message-time">
             {/*    {msg.timestamp.toLocateTimeString()} */}
              </span>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="chat-messages-input">
        
        <Input
          placeholder="Aa"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
      
        {newMessage ? (
          <Button type="submit"><Send size={20} /></Button>
        ): ( 
          <Button type="submit"><Send size={20} /></Button>
        )}
      </form>
    </div>
  );

  return (
<>
    <HeaderPublic/>
    <div className="messenger" style={{ marginTop:50 }}>
      {(!isMobileView || !selectedChat) && renderChatList()}
      {(!isMobileView || selectedChat) && (selectedChat ? renderChatMessages() : <div style={{ marginInline:50 }} className="no-chat-selected">Selecciona un chat para comenzar</div>)}
      {!isMobileView && (
        <div className="chat-info" style={{alignItems:"center",justifyContent:"center",background:"#07575B",borderRadius:50 }}>
          <div className="chat-info-header" style={{color:"white"}}> 
            <Avatar src={`/placeholder-avatar-${selectedChat}.jpg`} alt={currentChat?.name} fallback={currentChat?.name.substring(0, 2)} />
            <h2>{currentChat?.name}</h2>
            <p>Animate Enviame Un Mensaje</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .messenger {
          display: flex;
          justify-content: space-between;
          height: 100vh;
          background-color: white;
          color: #e4e6eb;
        }

        .chat-list, .chat-info {
         
        width: 30%;
          border-right: 1px solid #393a3b;
          display: flex;
          flex-direction: column;
        }

        .chat-messages {
          flex-grow: 1;
          width: 70%;
          display: flex;
          flex-direction: column;
        }

        .chat-list-header, .chat-messages-header, .chat-info-header {
        color:black;
          padding: 16px;
          border-bottom: 1px solid #393a3b;
        }

        .chat-list-search {
          padding: 8px;
        }

        .chat-list-items {
          overflow-y: auto;
          flex-grow: 1;
        }

        .chat-item {
          display: flex;
          align-items: center;
          padding: 8px;
          cursor: pointer;
        }

        .chat-item:hover, .chat-item.active {
        
          background:#C4DFE6;
          color:black;
        }

        .chat-item-info {
          margin-left: 12px;
          flex-grow: 1;
        }

        .chat-item-name-time {
          display: flex;
          justify-content: space-between;
          color:black;
        }

        .chat-item-last-message {
          
          font-size: 0.9em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color:black;
        }

        .chat-item-unread {
          background-color: #31a24c;
          color: white;
          border-radius: 50%;
          padding: 2px 6px;
          font-size: 0.8em;
        }

        .chat-messages-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background:#003B46;
          border-radius:20px;
          color:white;
          box-shadow:0px 10px 20px rgba(0, 0, 0, 0.5);
        }

        .chat-messages-header-info {
          display: flex;
          align-items: center;
        }

        .chat-messages-header-actions {
          display: flex;
        }

        .chat-messages-list {
          flex-grow: 1;
          overflow-y: auto;
          padding: 16px;
        }

        .message {
          margin-bottom: 16px;
          display: flex;
        }

        .message.user {
          justify-content: flex-end;
        }

        .message-content {
          max-width: 70%;
          padding: 8px 12px;
          border-radius: 18px;
          background-color: #003B46;
          box-shadow:0px 10px 20px rgba(0, 0, 0, 0.5);
        }

        .message.user .message-content {
          background-color: #66A5AD;
          box-shadow:0px 10px 20px rgba(0, 0, 0, 0.5);
        }
        

        .message-time {
          font-size: 0.8em;
          color: #b0b3b8;
          margin-top: 4px;
        }

        .chat-messages-input {
          display: flex;
          align-items: center;
          padding: 16px;
          border-top: 1px solid #393a3b;
        }

        .chat-info-actions {
          padding: 16px;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }

        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .button {
          background: white;
          border: none;
          color: #003B46;
          cursor: pointer;
          padding: 8px;
        }

        .button:hover {
          background-color: black;
          color:white;
          border-radius: 50%;
        }

        .input {
          background-color: white;
          border: 2px solid black
          border: none;
          border-radius: 20px;
          color: black;
          padding: 8px 12px;
          width: 90%;
        }

        .no-chat-selected {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          font-size: 1.2em;
          color: #b0b3b8;
        }

        .back-button {
          margin-right: 16px;
        }

        @media (max-width: 768px) {
          .messenger {
            flex-direction: column;
          }

          .chat-list, .chat-messages {
            width: 100%;
            height: 100vh;
          }

          .chat-info {
            display: none;
          }
        }
      `}</style>
    </div>
    </>
  );
}