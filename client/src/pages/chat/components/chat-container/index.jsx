import ChatHeader from "./components/chat-header";
import MessageBar from "./components/message-bar";
import MessageContainer from "./components/message-container";

const ChatContainer = () => {
    return (
        <div className="fixed top-0 h-[100vh] w-[100vw] bg-gradient-to-b from-[#1A1A2E] to-[#16213E] flex flex-col md:static md:flex-1 border-2 border-white">
            <ChatHeader />
            <MessageContainer />
            <MessageBar />
        </div>
    );
};

export default ChatContainer;
