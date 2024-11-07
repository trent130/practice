import React from 'react';
import { Menu, Trophy, User2, LogOut, Shield, Award, Activity } from 'lucide-react';

interface NavbarProps {
  onPageChange: (page: 'challenges' | 'profile' | 'team' | 'teams' | 'admin' | 'scoreboard') => void;
}

export default function Navbar({ onPageChange }: NavbarProps) {
  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button className="lg:hidden p-2 rounded-md hover:bg-indigo-500">
              <Menu size={24} />
            </button>
            <div className="flex items-center space-x-2">
              <Trophy size={24} className="text-yellow-300" />
              <span className="font-bold text-xl">CTF Arena</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            <button onClick={() => onPageChange('challenges')} className="hover:text-indigo-200">
              Challenges
            </button>
            <button onClick={() => onPageChange('teams')} className="hover:text-indigo-200">
              Teams
            </button>
            <button onClick={() => onPageChange('team')} className="hover:text-indigo-200">
              My Team
            </button>
            <button onClick={() => onPageChange('scoreboard')} className="hover:text-indigo-200 flex items-center space-x-1">
              <Award size={16} />
              <span>Scoreboard</span>
            </button>
            <button onClick={() => onPageChange('admin')} className="hover:text-indigo-200 flex items-center space-x-1">
              <Shield size={16} />
              <span>Admin</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-indigo-500">
              <Activity size={20} />
            </button>
            <button 
              onClick={() => onPageChange('profile')}
              className="p-2 rounded-full hover:bg-indigo-500"
            >
              <User2 size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-indigo-500">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}