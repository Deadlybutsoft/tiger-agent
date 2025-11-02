import React, { ReactNode } from 'react';
import { CloseIcon } from './Icons';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children, title }) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-gray-900/80 backdrop-blur-xl border-l border-gray-800 shadow-2xl shadow-purple-900/20 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <CloseIcon
              className="w-7 h-7 text-gray-400 hover:text-white cursor-pointer transition-colors"
              onClick={onClose}
            />
          </div>
          {/* Content */}
          <div className="flex-grow p-6 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;