import React, { useState, useEffect, useRef } from 'react';
import { Bot, Wand2, Send, Loader2, Sparkles } from 'lucide-react';
import { getGeminiResponse, generateInstagramCopy } from '../geminiService';

const AiAssistantApp = () => {
  const [mode, setMode] = useState('chat'); 
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'ai', text: '¡Hola! Soy la versión IA de Julieta. ¿En qué puedo ayudarte?' }]);
  const [generatedCopy, setGeneratedCopy] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Solución al error de useEffect: Desplazar el chat al final cuando hay mensajes nuevos
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, generatedCopy]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input;
    setLoading(true);
    setInput('');

    if (mode === 'chat') {
      setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
      const response = await getGeminiResponse(userMessage);
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    } else {
      // Solución al error de generateInstagramCopy: Usarlo en el modo generador
      const copy = await generateInstagramCopy(userMessage);
      setGeneratedCopy(copy);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      <div className="p-4 bg-white border-b flex justify-center gap-2">
        <button onClick={() => setMode('chat')} className={`px-4 py-2 rounded-xl text-xs font-bold ${mode === 'chat' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>CHAT</button>
        <button onClick={() => { setMode('generator'); setGeneratedCopy(''); }} className={`px-4 py-2 rounded-xl text-xs font-bold ${mode === 'generator' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>COPIES</button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {mode === 'chat' ? (
          messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'ai' ? 'bg-white border' : 'bg-blue-500 text-white'}`}>{msg.text}</div>
            </div>
          ))
        ) : (
          generatedCopy && <div className="bg-white p-6 rounded-2xl border italic">"{generatedCopy}"</div>
        )}
        {loading && <Loader2 className="animate-spin mx-auto text-blue-500" />}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} className="flex-1 p-3 border rounded-full text-sm" placeholder={mode === 'chat' ? "Pregúntame algo..." : "Describe el tema del post..."} />
        <button onClick={handleSend} className="p-3 bg-blue-500 text-white rounded-full"><Send size={18}/></button>
      </div>
    </div>
  );
};

export default AiAssistantApp;