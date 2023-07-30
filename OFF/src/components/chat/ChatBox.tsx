import { useState } from "react";

interface Message {
  content: string;
  sender: "me" | "others";
}
const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([
    { content: "Hello!", sender: "others" },
    { content: "Hi there!", sender: "me" },
    { content: "How are you?", sender: "others" },
  ]);

  const [newMessage, setNewMessage] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: newMessage, sender: "me" },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div
    className="m-auto my-6 w-screen max-w-[450px] rounded-lg border border-gray-200 p-4 pt-4 shadow-sm sm:p-6 lg:p-8"
    aria-modal="true"
    role="dialog"
    tabIndex={-1}
  >
    <div className=" space-y-6">
      <ul className="space-y-4">
      <>
      <div className="flex items-center">
        <div className="h-10 w-10 flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
            alt=""
          />
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">MISHAB</div>
        </div>
      </div>
      <hr className="my-8" />
      <div className="message-list space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.sender === "me" ? "sent-message" : "received-message"
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className="input-box flex items-center mt-5 ">
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleSendMessage}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2"
        >
          Send
        </button>
      </div>
      <style>{`
            .message-list {
              display: flex;
              flex-direction: column;
            }
    
            .message {
              max-width: 80%;
              word-wrap: break-word;
              padding: 8px 12px;
              border-radius: 8px;
              margin: 8px;
            }
    
            .sent-message {
              align-self: flex-end;
              background-color: #dcf8c6;
            }
    
            .received-message {
              align-self: flex-start;
              background-color: #f3f3f3;
            }
          `}</style>
    </>
        {/* <ChatBox /> */}
      </ul>
    </div>
  </div>

  );
};

export default ChatBox;
