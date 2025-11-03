
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import SettingsModal from '../components/SettingsModal';
import { 
    HistoryIcon, 
    EditIcon, 
    UserProfileIcon,
    ChevronDoubleRightIcon,
    ChevronDoubleLeftIcon,
    MoreHorizontalIcon,
    ShareIcon,
    LightbulbIcon,
    RefreshIcon,
    VolumeUpIcon,
    ChatBubbleIcon,
    ClipboardIcon,
    ThumbUpIcon,
    ThumbDownIcon,
    PaperclipIcon,
    ArrowUpIcon,
    SettingsIcon,
    PauseIcon,
    CheckIcon,
    PlusIcon
} from '../components/Icons';

// Base64 decoding for TTS
function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}
  
// PCM audio data to AudioBuffer for TTS
async function decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
        }
    }
    return buffer;
}


interface SidebarItemProps {
    icon: React.ReactNode;
    text: string;
    active?: boolean;
    expanded: boolean;
    onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, active, expanded, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center w-full h-12 px-3.5 rounded-full transition-colors duration-200 ${
        active ? 'bg-[#424243] text-white' : 'text-white hover:bg-[#4a4a4b]'
      } ${expanded ? 'justify-start' : 'justify-center'}`}
    >
      <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center">{icon}</div>
      {expanded && <span className="ml-3 font-medium whitespace-nowrap">{text}</span>}
    </button>
  );

const AiMessageAction: React.FC<{ icon: React.ReactNode; onClick?: () => void }> = ({ icon, onClick }) => (
    <button onClick={onClick} className="text-gray-200 hover:text-white transition-colors">
        {icon}
    </button>
);

interface Message {
    role: 'user' | 'model';
    content: string;
}

const Dashboard: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [chatTitle, setChatTitle] = useState('New Chat');
    const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
    const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>({});
    const [feedback, setFeedback] = useState<{ [key: number]: 'up' | 'down' | null }>({});
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const moreMenuRef = useRef<HTMLDivElement>(null);
    const generationControllerRef = useRef<{ stop: () => void } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading, inputValue]);
    
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [inputValue]);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
                setIsMoreMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [moreMenuRef]);

    const handleSendMessage = async (e?: React.FormEvent, prompt?: string) => {
        if (e) e.preventDefault();
        const currentInput = (prompt || inputValue).trim();
        if (!currentInput || isLoading) return;

        const newMessages: Message[] = [...messages, { role: 'user', content: currentInput }];
        setMessages(newMessages);
        if (!prompt) setInputValue('');
        setIsLoading(true);
        
        let shouldStop = false;
        generationControllerRef.current = { stop: () => { shouldStop = true; } };

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const responseStream = await ai.models.generateContentStream({
                model: 'gemini-2.5-flash',
                contents: currentInput,
            });

            setMessages(prev => [...prev, { role: 'model', content: '' }]);

            for await (const chunk of responseStream) {
                if (shouldStop) break;
                const text = chunk.text;
                if (text) {
                    setMessages(prev => {
                        const newMsgs = [...prev];
                        newMsgs[newMsgs.length - 1].content += text;
                        return newMsgs;
                    });
                }
            }
        } catch (error) {
            console.error("Error calling Gemini API", error);
            setMessages(prev => [...prev, { role: 'model', content: "Sorry, I encountered an error. Please try again." }]);
        } finally {
            setIsLoading(false);
            generationControllerRef.current = null;
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleRegenerate = () => {
        const lastUserMessage = messages.filter(m => m.role === 'user').pop();
        if (lastUserMessage) {
            setMessages(prev => prev.slice(0, -1)); // Remove previous model response
            handleSendMessage(undefined, lastUserMessage.content);
        }
    };

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedStates(prev => ({ ...prev, [index]: true }));
        setTimeout(() => {
            setCopiedStates(prev => ({ ...prev, [index]: false }));
        }, 2000);
    };

    const handleTTS = async (text: string) => {
        if (!text) return;
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-preview-tts",
                contents: [{ parts: [{ text }] }],
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
                },
            });
            const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
                // Fix: Cast window to `any` to allow for vendor-prefixed `webkitAudioContext` for cross-browser compatibility.
                const outputAudioContext = new ((window as any).AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
                const audioBuffer = await decodeAudioData(decode(base64Audio), outputAudioContext, 24000, 1);
                const source = outputAudioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputAudioContext.destination);
                source.start();
            }
        } catch (error) {
            console.error("Error generating speech", error);
        }
    };
    
    const handleFeedback = (index: number, type: 'up' | 'down') => {
        setFeedback(prev => ({ ...prev, [index]: prev[index] === type ? null : type }));
    };

    const handleClearChat = () => {
        setMessages([]);
        setIsMoreMenuOpen(false);
    };

    const handleRenameChat = () => {
        const newTitle = prompt("Enter new chat title:", chatTitle);
        if (newTitle) {
            setChatTitle(newTitle);
        }
        setIsMoreMenuOpen(false);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            console.log("Uploaded file:", file.name);
            // Here you would handle the file, e.g., read it for multimodal input
        }
    };

    const mainSidebarItems = [
        // Fix: Added `active: true` to satisfy the `SidebarItem` component's props.
        { id: 'history', icon: <HistoryIcon className="w-6 h-6" />, text: 'History', active: true },
    ];

  return (
    <div className="flex h-screen w-full bg-[#363637] text-gray-300 font-sans">
      <aside className={`flex flex-col justify-between p-4 bg-[#363637] transition-all duration-300 border-r border-[#515152] ${isSidebarExpanded ? 'w-64' : 'w-20'}`}>
        <div className="flex flex-col items-center gap-4">
            <button
                onClick={() => window.location.hash = ''}
                className={`flex items-center h-20 w-full mb-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md ${isSidebarExpanded ? 'px-3.5' : 'justify-center'}`}
                aria-label="Go to homepage"
            >
                <img src="https://res.cloudinary.com/dkvkxermy/image/upload/v1762160811/20bbfb2f-a218-4a21-b75f-4b75789f05d8_ycizdr.png" alt="Suvo Logo" className="h-20 w-20" />
                {isSidebarExpanded && <span className="font-saira text-3xl font-bold text-white tracking-wider ml-2">Suvo</span>}
            </button>
            {mainSidebarItems.map((item) => (
                <SidebarItem key={item.id} icon={item.icon} text={item.text} active={item.active} expanded={isSidebarExpanded} />
            ))}
        </div>
        <div className="flex flex-col items-center gap-4 w-full">
            <SidebarItem icon={<UserProfileIcon className="w-7 h-7" />} text="Profile" expanded={isSidebarExpanded} onClick={() => setIsSettingsOpen(true)} />
            <SidebarItem icon={<SettingsIcon className="w-6 h-6" />} text="Settings" expanded={isSidebarExpanded} onClick={() => setIsSettingsOpen(true)} />
            <button
                onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                className={`flex items-center w-full h-12 rounded-full transition-colors duration-200 text-white hover:bg-[#4a4a4b] ${isSidebarExpanded ? 'justify-start px-3.5' : 'justify-center'}`}
                aria-label={isSidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
            >
                <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center">
                    {isSidebarExpanded ? <ChevronDoubleLeftIcon className="w-6 h-6" /> : <ChevronDoubleRightIcon className="w-6 h-6" />}
                </div>
            </button>
        </div>
      </aside>

      <div className="relative isolate flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4">
            <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-white">{chatTitle}</h2>
                <button onClick={handleRenameChat} className="p-2 rounded-full hover:bg-[#4a4a4b] transition-colors">
                    <EditIcon className="w-5 h-5 text-gray-400" />
                </button>
            </div>
            <div className="flex items-center gap-2">
                <div className="relative" ref={moreMenuRef}>
                    <button onClick={() => setIsMoreMenuOpen(prev => !prev)} className="p-2 rounded-full hover:bg-[#4a4a4b] transition-colors">
                        <MoreHorizontalIcon className="w-6 h-6 text-white" />
                    </button>
                    {isMoreMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-[#424243] border border-[#515152] rounded-md shadow-lg z-10">
                            <button onClick={handleClearChat} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#4a4a4b]">Clear Chat</button>
                        </div>
                    )}
                </div>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center">
            <div className="w-full max-w-4xl space-y-8">
                {messages.length === 0 && !isLoading && (
                    <div className="text-center text-gray-500 mt-20">
                        <img src="https://res.cloudinary.com/dkvkxermy/image/upload/v1762160811/20bbfb2f-a218-4a21-b75f-4b75789f05d8_ycizdr.png" alt="Suvo Logo" className={`mx-auto opacity-20 mb-4 transition-all duration-300 ${isSidebarExpanded ? 'h-52 w-52' : 'h-40 w-40'}`} />
                        <h1 className="text-2xl font-medium text-white">How can I help you today?</h1>
                    </div>
                )}

                {messages.map((message, index) => (
                    message.role === 'user' ? (
                        <div key={index} className="flex justify-end">
                            <div className="bg-[#424243] rounded-xl px-5 py-3 max-w-[80%]">
                                <p className="text-white whitespace-pre-wrap">{message.content}</p>
                            </div>
                        </div>
                    ) : (
                        <div key={index} className="flex flex-col gap-4 max-w-[80%]">
                            <div>
                                <p className="text-white text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <AiMessageAction icon={<RefreshIcon className="w-5 h-5" />} onClick={handleRegenerate} />
                                    <AiMessageAction icon={<VolumeUpIcon className="w-5 h-5" />} onClick={() => handleTTS(message.content)} />
                                    <AiMessageAction icon={copiedStates[index] ? <CheckIcon className="w-5 h-5 text-green-400" /> : <ClipboardIcon className="w-5 h-5" />} onClick={() => handleCopy(message.content, index)} />
                                    <AiMessageAction icon={<ShareIcon className="w-5 h-5" />} onClick={() => alert('Share functionality coming soon!')}/>
                                </div>
                                <div className="flex items-center gap-3 border-l border-[#515152] pl-3">
                                    <AiMessageAction icon={<ThumbUpIcon className="w-5 h-5" isFilled={feedback[index] === 'up'} />} onClick={() => handleFeedback(index, 'up')} />
                                    <AiMessageAction icon={<ThumbDownIcon className="w-5 h-5" isFilled={feedback[index] === 'down'} />} onClick={() => handleFeedback(index, 'down')} />
                                </div>
                            </div>
                        </div>
                    )
                ))}

                {isLoading && (
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-gray-400">
                            <LightbulbIcon className="w-5 h-5 animate-pulse" />
                            <span>Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
        </main>

        <footer className="p-4 md:pb-8 md:px-6 flex justify-center">
            <div className="w-full max-w-4xl">
                <form onSubmit={handleSendMessage} className="bg-[#424243] border border-[#515152] rounded-2xl overflow-hidden flex flex-col">
                    <textarea
                        ref={textareaRef}
                        rows={1}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="How can Suvo help?"
                        disabled={isLoading}
                        className="w-full bg-transparent px-6 py-4 text-white placeholder-gray-500 focus:outline-none resize-none overflow-y-auto max-h-48 disabled:opacity-50 hide-scrollbar"
                        style={{ lineHeight: '1.5rem' }}
                    />
                    <div className="flex justify-between items-center pl-4 pr-2 pb-2">
                        <div>
                           <input type="file" id="file-upload" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
                           <label htmlFor="file-upload" className="cursor-pointer text-white p-3 rounded-full hover:bg-[#4a4a4b] inline-block">
                              <PaperclipIcon className="w-6 h-6" />
                           </label>
                        </div>
                        <div>
                            {isLoading ? (
                                <button type="button" onClick={() => generationControllerRef.current?.stop()} className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-black transition-all active:scale-90">
                                    <PauseIcon className="w-6 h-6" />
                                </button>
                            ) : (
                                <button type="submit" disabled={!inputValue.trim()} className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-black transition-all active:scale-90 disabled:bg-[#515152] disabled:cursor-not-allowed">
                                    <ArrowUpIcon className="w-6 h-6" />
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </footer>
      </div>
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};

export default Dashboard;
