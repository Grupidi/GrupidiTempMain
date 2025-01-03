import { ChatMessage } from './types';

interface ChatMessageListProps {
  messages: ChatMessage[];
}

export function ChatMessageList({ messages }: ChatMessageListProps) {
  return (
    <main className="flex-1 p-4 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${message.isSelf ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-full py-2 px-4 max-w-[70%] ${
                message.isSelf ? 'bg-pink-500 text-white' : 'bg-white text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}