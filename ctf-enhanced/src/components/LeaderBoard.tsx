import React from 'react';
import { Trophy, Users, Award } from 'lucide-react';
import type { Team } from '../types';

interface LeaderboardProps {
  teams: Team[];
}

export default function Leaderboard({ teams }: LeaderboardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Trophy className="text-yellow-500" size={24} />
        <h2 className="text-2xl font-bold text-gray-900">Leaderboard</h2>
      </div>

      <div className="space-y-4">
        {teams.map((team, index) => (
          <div
            key={team.id}
            className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <span className={`text-lg font-semibold ${
                index === 0 ? 'text-yellow-500' :
                index === 1 ? 'text-gray-400' :
                index === 2 ? 'text-amber-700' :
                'text-gray-600'
              }`}>
                #{index + 1}
              </span>
              
              <div>
                <div className="flex items-center space-x-2">
                  <Users size={16} className="text-indigo-600" />
                  <span className="font-medium text-gray-900">{team.name}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {team.members.length} members
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Award size={16} className="text-yellow-500" />
              <span className="font-semibold text-gray-900">{team.score} pts</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}