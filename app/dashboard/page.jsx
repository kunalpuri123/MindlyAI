import { Conversation } from './interview/[interviewId]/start/_components/conversation'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12 bg-black-50">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6 text-white">
        <span className="text-white">Mindly AI</span>
        <i
            className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text animate-gradient-move"
            style={{ display: 'inline-block' }}
          >
            AI
          </i>  
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          We are here to help you!
        </p>
        <Conversation />
      </div>
    </main>
  );
}
