import React, { useState } from 'react';
import { Users, Search, Trophy, UserPlus, Shield, Star, Activity } from 'lucide-react';
import type { Team } from '../types';

interface TeamsViewProps {
  teams: Team[];
  onJoinTeam: (teamId: string) => void;
}

export default function TeamsView({ teams, onJoinTeam }: TeamsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'recruiting' | 'top'>('all');

  const categories = [
    { id: 'all', name: 'All Teams', icon: Users },
    { id: 'recruiting', name: 'Recruiting', icon: UserPlus },
    { id: 'top', name: 'Top Teams', icon: Trophy }
  ];

  const filteredTeams = teams
    .filter(team => 
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.members.some(member => 
        member.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .filter(team => {
      if (selectedCategory === 'recruiting') return team.members.length < 4;
      if (selectedCategory === 'top') return team.rank <= 10;
      return true;
    });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search teams or members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex space-x-2">
            {categories.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedCategory(id as typeof selectedCategory)}
                className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                  selectedCategory === id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon size={16} />
                <span className="hidden md:inline">{name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Users className="text-indigo-600" size={24} />
                      {team.rank <= 3 && (
                        <Star
                          size={16}
                          className="absolute -top-2 -right-2 text-yellow-500 fill-current"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                      <p className="text-sm text-gray-500">
                        {team.members.length} members
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center space-x-1">
                      <Trophy size={16} className="text-yellow-500" />
                      <span className="font-semibold">#{team.rank}</span>
                    </div>
                    <span className="text-sm text-gray-500">{team.score} pts</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex -space-x-2 overflow-hidden">
                    {team.members.map((member) => (
                      <img
                        key={member.id}
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                        src={member.avatar}
                        alt={member.username}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Activity size={16} className="text-green-500" />
                      <span className="text-sm text-gray-600">Active</span>
                    </div>
                    {team.members.length < 4 && (
                      <button
                        onClick={() => onJoinTeam(team.id)}
                        className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 border border-indigo-600 rounded-md hover:bg-indigo-50"
                      >
                        Request to Join
                      </button>
                    )}
                  </div>

                  {team.members.some(m => m.role === 'team_leader') && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Shield size={16} className="text-indigo-600" />
                      <span>Led by {team.members.find(m => m.role === 'team_leader')?.username}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}