
import React from 'react';
import { CloseIcon, UserProfileIcon, SunIcon, MoonIcon } from './Icons';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <div
        className={`relative w-full max-w-lg bg-[#212121]/90 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl shadow-purple-900/20 overflow-hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">Settings</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close modal"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
        </div>
        <div className="p-6 text-white">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Theme</h3>
            <div className="mt-2 p-3 bg-gray-800/50 rounded-lg flex justify-between items-center">
                <span className="font-medium">Appearance</span>
                <div className="flex items-center gap-1 p-1 bg-gray-900/70 rounded-md">
                    <button className="p-1.5 rounded bg-gray-700 text-white"><SunIcon className="w-5 h-5" /></button>
                    <button className="p-1.5 text-gray-400 hover:text-white"><MoonIcon className="w-5 h-5" /></button>
                </div>
            </div>

            <div className="w-full border-b border-gray-700/50 my-8"></div>

            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Profile</h3>
            <div className="mt-4 flex items-center gap-4">
                <UserProfileIcon className="w-24 h-24" />
                <div>
                    <p className="font-semibold text-lg text-white">Guest User</p>
                    <p className="text-sm text-gray-400">guest@example.com</p>
                </div>
            </div>
            <button className="w-full mt-4 py-2.5 bg-gray-800/50 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Manage Account
            </button>

            <div className="w-full border-t border-gray-700/50 my-8"></div>
            <p className="text-center text-xs text-gray-500">Suvo v1.0. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;