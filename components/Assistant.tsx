import React, { useState, useRef, useEffect } from 'react';
import { generateLogisticsContent } from '../services/geminiService';
import { Bot, Send, Loader2, Sparkles, User, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AssistantProps {
  initialPrompt?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Assistant: React.FC<AssistantProps> = ({ initialPrompt }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hola, soy tu experto en logística virtual. Puedo ayudarte a redactar correos, scripts de ventas o analizar rutas para CA, TX y FL. ¿En qué trabajamos hoy?' 
    }
  ]);
  const [input, setInput] = useState(initialPrompt || '');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt) {
      setInput(initialPrompt);
    }
  }, [initialPrompt]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsLoading(true);

    // Provide context from the PDF knowledge base implicitly
    const context = `
      Plan de Negocios Logística 24/7 Dry Van 53ft.
      Foco: California (AB5, Puertos), Texas (Cross-border, triangulo), Florida (Seasonality, Backhaul).
      ICP: Retail, Auto, CPG.
      UVP: Velocidad, Confiabilidad, Visibilidad 24/7.
    `;

    const response = await generateLogisticsContent(userMsg, context);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response || "Lo siento, no pude generar una respuesta." }]);
    setIsLoading(false);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] max-h-screen bg-slate-50">
      <div className="p-6 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Asistente de Generación</h2>
            <p className="text-xs text-slate-500">Impulsado por Gemini 2.5 Flash</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mx-2 ${
                msg.role === 'user' ? 'bg-slate-200' : 'bg-indigo-100 text-indigo-600'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              
              <div className={`p-4 rounded-2xl shadow-sm relative group ${
                msg.role === 'user' 
                  ? 'bg-slate-800 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
              }`}>
                {msg.role === 'assistant' && (
                  <button 
                    onClick={() => handleCopy(msg.content, idx)}
                    className="absolute top-2 right-2 p-1.5 bg-slate-100 rounded hover:bg-slate-200 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Copiar texto"
                  >
                    {copiedIndex === idx ? <Check className="w-3 h-3 text-green-600"/> : <Copy className="w-3 h-3"/>}
                  </button>
                )}
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="flex flex-row items-center space-x-2 ml-12">
                <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
                <span className="text-sm text-slate-400">Escribiendo...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Pide un email, un script o un consejo estratégico..."
            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none h-14 outline-none transition-all"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-center text-xs text-slate-400 mt-2">
          La IA puede cometer errores. Verifica la información antes de enviarla a clientes.
        </p>
      </div>
    </div>
  );
};

export default Assistant;