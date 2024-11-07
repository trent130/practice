import React from 'react';
import { User2, Trophy, Flag, Target, Shield, Star, Award, Zap, Users } from 'lucide-react';
import type { User } from '../types';

interface ProfileCardProps {
  user: User;
}

const achievements = [
  {
    id: 1,
    title: 'First Blood',
    description: 'First to solve a challenge',
    icon: Target,
    color: 'text-red-500',
    date: '2024-03-15'
  },
  {
    id: 2,
    title: 'Speed Demon',
    description: 'Solved 5 challenges in 1 hour',
    icon: Zap,
    color: 'text-yellow-500',
    date: '2024-03-14'
  },
  {
    id: 3,
    title: 'Team Player',
    description: 'Helped solve 10 team challenges',
    icon: Users,
    color: 'text-blue-500',
    date: '2024-03-13'
  }
];

const stats = [
  { label: 'Total Score', value: '2500', icon: Trophy, color: 'text-yellow-500' },
  { label: 'Challenges Solved', value: '15', icon: Flag, color: 'text-green-500' },
  { label: 'First Bloods', value: '3', icon: Target, color: 'text-red-500' },
  { label: 'Team Rank', value: '#2', icon: Users, color: 'text-blue-500' }
];

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-white p-1">
              <img
                src={user.avatar}
                alt={user.username}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            {user.role === 'team_leader' && (
              <Shield className="absolute -bottom-1 -right-1 text-yellow-400 bg-white rounded-full p-1" size={24} />
            )}
          </div>
          <div className="text-white">
            <h2 className="text-2xl font-bold">{user.username}</h2>
            <p className="text-indigo-100">{user.role.replace('_', ' ').toUpperCase()}</p>
            <div className="flex items-center mt-2 space-x-2">
              <Star className="text-yellow-400 fill-current" size={16} />
              <span className="text-sm">Active since March 2024</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <stat.icon className={stat.color} size={20} />
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Award className="text-indigo-600" size={20} />
              <span>Recent Achievements</span>
            </h3>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <achievement.icon className={achievement.color} size={24} />
                    <div>
                      <p className="font-medium text-gray-900">{achievement.title}</p>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(achievement.date).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
            <div className="space-y-4">
              {user.solvedChallenges.map((challenge, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 mt-2 rounded-full bg-indigo-600"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Solved Challenge #{challenge}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}