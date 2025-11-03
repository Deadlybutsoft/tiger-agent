
import React from 'react';
import { 
    SearchIcon, 
    EditIcon, 
    AudioWaveIcon, 
    GridIcon, 
    FolderIcon, 
    HistoryIcon, 
    UserProfileIcon,
    ChevronDoubleRightIcon,
    MoreHorizontalIcon,
    ShareIcon,
    PencilIcon,
    LightbulbIcon,
    RefreshIcon,
    VolumeUpIcon,
    ChatBubbleIcon,
    ClipboardIcon,
    ThumbUpIcon,
    ThumbDownIcon,
    MicrophoneIcon,
    MoonIcon,
    VoiceWaveIcon,
    GrokIcon
} from '../components/Icons';

const SidebarIcon: React.FC<{ icon: React.ReactNode; active?: boolean; }> = ({ icon, active }) => (
    <button className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 ${active ? 'bg-white text-black' : 'hover:bg-gray-800'}`}>
        {icon}
    </button>
);

const AiMessageAction: React.FC<{ icon: React.ReactNode; }> = ({ icon }) => (
    <button className="text-gray-500 hover:text-white transition-colors">
        {icon}
    </button>
);

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen w-full bg-[#131313] text-gray-300 font-sans">
      {/* Sidebar */}
      <aside className="w-20 bg-black flex flex-col items-center justify-between p-4">
        <div className="flex flex-col items-center gap-4">
            <SidebarIcon icon={<GrokIcon className="w-7 h-7" />} />
            <div className="w-full border-b border-gray-800 my-2"></div>
            <SidebarIcon icon={<SearchIcon className="w-6 h-6" />} active />
            <SidebarIcon icon={<PencilIcon className="w-6 h-6" />} />
            <SidebarIcon icon={<AudioWaveIcon className="w-6 h-6" />} />
            <SidebarIcon icon={<GridIcon className="w-6 h-6" />} />
            <SidebarIcon icon={<FolderIcon className="w-6 h-6" />} />
            <SidebarIcon icon={<HistoryIcon className="w-6 h-6" />} />
        </div>
        <div className="flex flex-col items-center gap-4">
            <SidebarIcon icon={<UserProfileIcon className="w-12 h-12" />} />
            <SidebarIcon icon={<ChevronDoubleRightIcon className="w-6 h-6" />} />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-end items-center p-4">
            <div className="flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                    <MoreHorizontalIcon className="w-6 h-6 text-gray-400" />
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 hover:bg-gray-800 transition-colors">
                    <ShareIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-white font-medium">Share</span>
                </button>
                <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                    <EditIcon className="w-6 h-6 text-gray-400" />
                </button>
            </div>
        </header>

        {/* Chat Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center">
            <div className="w-full max-w-4xl">
                {/* User Message */}
                <div className="flex justify-end mb-8">
                    <div className="bg-[#1e1e1e] rounded-xl px-5 py-3">
                        <p className="text-white">hi bro</p>
                    </div>
                </div>

                {/* AI Message */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-gray-400">
                        <LightbulbIcon className="w-5 h-5"/>
                        <span>Thought for 2s</span>
                    </div>
                    <div>
                        <p className="text-white text-base leading-relaxed">
                            Hey bro! What's cooking? Got any wild questions or just here to shoot the breeze?
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <AiMessageAction icon={<RefreshIcon className="w-5 h-5" />} />
                            <AiMessageAction icon={<VolumeUpIcon className="w-5 h-5" />} />
                            <AiMessageAction icon={<ChatBubbleIcon className="w-5 h-5" />} />
                            <AiMessageAction icon={<ClipboardIcon className="w-5 h-5" />} />
                            <AiMessageAction icon={<ShareIcon className="w-5 h-5" />} />
                        </div>
                        <div className="flex items-center gap-3 border-l border-gray-700 pl-3">
                            <AiMessageAction icon={<ThumbUpIcon className="w-5 h-5" />} />
                            <AiMessageAction icon={<ThumbDownIcon className="w-5 h-5" />} />
                        </div>
                        <AiMessageAction icon={<MoreHorizontalIcon className="w-5 h-5" />} />
                        <span className="text-xs text-gray-500">843ms</span>
                    </div>
                </div>
            </div>
        </main>

        {/* Input Bar */}
        <footer className="p-4 md:p-6 flex justify-center">
            <div className="w-full max-w-4xl">
                <div className="relative flex items-center">
                    <div className="absolute left-0 flex items-center pl-4">
                        <button className="text-gray-500 hover:text-white">
                            <MicrophoneIcon className="w-6 h-6" />
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="How can Grok help?"
                        className="w-full bg-[#1e1e1e] border border-gray-700 rounded-full py-4 pl-14 pr-48 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    <div className="absolute right-0 flex items-center pr-2 gap-2">
                         <button className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#1e1e1e] border border-gray-700 hover:bg-gray-800 transition-colors">
                            <MoonIcon className="w-5 h-5 text-gray-400" />
                            <span className="text-white font-medium text-sm">Grok 4 Fast</span>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 transition-colors">
                            <VoiceWaveIcon className="w-7 h-7" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
