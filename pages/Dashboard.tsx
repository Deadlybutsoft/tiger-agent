
import React, { useState } from 'react';
import Drawer from '../components/Drawer';
import { SettingsIcon, UserIcon, SunIcon, CreditCardIcon, LinkIcon, SearchIcon, BellIcon, ChartBarIcon } from '../components/Icons';

// A reusable StatCard component for the dashboard
const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; change: string; }> = ({ icon, title, value, change }) => (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex flex-col gap-4 transform transition-all hover:-translate-y-1 hover:border-purple-500/50">
        <div className="flex items-center justify-between">
            <h3 className="text-gray-400 font-medium">{title}</h3>
            <div className="text-gray-500">{icon}</div>
        </div>
        <div>
            <p className="text-4xl font-bold text-white">{value}</p>
            <p className="text-sm text-emerald-400">{change}</p>
        </div>
    </div>
);

const Dashboard: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const handleLogout = () => {
    window.location.hash = '';
  };

  return (
    <div className="min-h-screen w-full bg-[#0D0D10] text-gray-100 flex flex-col">
      
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0D0D10]/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                {/* Left side */}
                <div className="flex items-center gap-8">
                    <button onClick={() => window.location.hash = ''} className="text-2xl font-bold tracking-wider font-saira text-white">Suvo</button>
                </div>
                
                {/* Right side */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-gray-900 border border-gray-800 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all w-40 md:w-64"
                        />
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    </div>
                    <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors" aria-label="Notifications">
                        <BellIcon className="w-6 h-6" />
                    </button>
                    <button 
                        onClick={() => setIsDrawerOpen(true)}
                        className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                        aria-label="Open settings"
                    >
                        <SettingsIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8 animate-fade-in-up">
            <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-gray-400 mt-1">Welcome back, Demo User!</p>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <StatCard
                icon={<UserIcon className="w-6 h-6" />}
                title="Total Subscribers"
                value="1,482"
                change="+12% from last month"
            />
            <StatCard
                icon={<ChartBarIcon className="w-6 h-6" />}
                title="Conversion Rate"
                value="24.5%"
                change="+2.1% from last month"
            />
            <StatCard
                icon={<LinkIcon className="w-6 h-6" />}
                title="Total Clicks"
                value="23,912"
                change="+33% from last week"
            />
        </div>

        {/* Recent Activity Section */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="py-3 px-4 font-semibold text-sm text-gray-400">User</th>
                  <th className="py-3 px-4 font-semibold text-sm text-gray-400">Activity</th>
                  <th className="py-3 px-4 font-semibold text-sm text-gray-400 hidden sm:table-cell">Date</th>
                  <th className="py-3 px-4 font-semibold text-sm text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800 hover:bg-gray-800/60 transition-colors">
                    <td className="py-4 px-4 text-sm">jane.cooper@example.com</td>
                    <td className="py-4 px-4 text-sm">Signed up for 'Starlight' campaign</td>
                    <td className="py-4 px-4 text-sm hidden sm:table-cell">2 min ago</td>
                    <td className="py-4 px-4 text-sm"><span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400">Completed</span></td>
                </tr>
                <tr className="border-b border-gray-800 hover:bg-gray-800/60 transition-colors">
                    <td className="py-4 px-4 text-sm">cody.fisher@example.com</td>
                    <td className="py-4 px-4 text-sm">Generated new landing page</td>
                    <td className="py-4 px-4 text-sm hidden sm:table-cell">1 hour ago</td>
                    <td className="py-4 px-4 text-sm"><span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400">Completed</span></td>
                </tr>
                 <tr className="hover:bg-gray-800/60 transition-colors">
                    <td className="py-4 px-4 text-sm">esther.howard@example.com</td>
                    <td className="py-4 px-4 text-sm">Clicked on 'Nebula' waitlist link</td>
                    <td className="py-4 px-4 text-sm hidden sm:table-cell">3 hours ago</td>
                    <td className="py-4 px-4 text-sm"><span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-500/10 text-amber-400">Pending</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Settings">
        <div className="text-white flex flex-col h-full">
          <div className="flex-grow">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full border-2 border-gray-700 flex items-center justify-center bg-gray-800">
                <UserIcon className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Demo User</h3>
                <p className="text-sm text-gray-400">demo.user@example.com</p>
              </div>
            </div>
            <nav className="flex flex-col gap-2">
              <button onClick={() => { setIsDrawerOpen(false); }} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-colors text-left w-full">
                <UserIcon className="w-6 h-6 text-gray-400" />
                <span>My Profile</span>
              </button>
              <button className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-colors text-left w-full">
                <SunIcon className="w-6 h-6 text-gray-400" />
                <span>Appearance</span>
              </button>
              <button className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-colors text-left w-full">
                <CreditCardIcon className="w-6 h-6 text-gray-400" />
                <span>Billing</span>
              </button>
              <button className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-colors text-left w-full">
                <LinkIcon className="w-6 h-6 text-gray-400" />
                <span>Integrations</span>
              </button>
            </nav>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-800">
              <button onClick={handleLogout} className="w-full flex items-center justify-center py-2 px-4 bg-transparent border border-gray-700 rounded-lg text-gray-400 font-semibold hover:bg-gray-800 hover:text-white transition-colors">
                Logout
              </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Dashboard;
