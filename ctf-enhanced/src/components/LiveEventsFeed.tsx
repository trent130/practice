import React from 'react';
import { Activity, Award, Flag, Zap, Trophy, Target } from 'lucide-react';

interface Event {
  id: string;
  type: 'solve' | 'firstblood' | 'teamjoin' | 'achievement';
  title: string;
  description: string;
  timestamp: Date;
  team?: string;
  user?: string;
  points?: number;
}

const mockEvents: Event[] = [
  {
    id: '1',
    type: 'firstblood',
    title: 'First Blood!',
    description: 'Team Binary Bandits got first blood on "Buffer Overflow 101"',
    timestamp: new Date(),
    team: 'Binary Bandits',
    points: 500
  },
  {
    id: '2',
    type: 'solve',
    title: 'Challenge Solved',
    description: 'HackMaster solved "Web Exploitation Basics"',
    timestamp: new Date(Date.now() - 300000),
    user: 'HackMaster',
    points: 300
  }
];

const getEventIcon = (type: Event['type']) => {
  switch (type) {
    case 'firstblood':
      return Target;
    case 'solve':
      return Flag;
    case 'teamjoin':
      return Trophy;
    case 'achievement':
      return Award;
    default:
      return Activity;
  }
};

const getEventColor = (type: Event['type']) => {
  switch (type) {
    case 'firstblood':
      return 'text-red-500 bg-red-100';
    case 'solve':
      return 'text-green-500 bg-green-100';
    case 'teamjoin':
      return 'text-blue-500 bg-blue-100';
    case 'achievement':
      return 'text-purple-500 bg-purple-100';
    default:
      return 'text-gray-500 bg-gray-100';
  }
};

export default function LiveEventsFeed() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Zap className="text-yellow-500" size={24} />
          <h2 className="text-xl font-bold text-gray-900">Live Activity</h2>
        </div>
        <span className="flex items-center text-sm text-green-500">
          <span className="relative flex h-3 w-3 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          Live
        </span>
      </div>

      <div className="space-y-4">
        {mockEvents.map((event) => {
          const Icon = getEventIcon(event.type);
          const colorClass = getEventColor(event.type);
          
          return (
            <div key={event.id} className="flex items-start space-x-3">
              <div className={`flex-shrink-0 rounded-full p-2 ${colorClass}`}>
                <Icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{event.title}</p>
                <p className="text-sm text-gray-500">{event.description}</p>
                <div className="flex items-center mt-1">
                  {event.points && (
                    <span className="text-xs font-medium text-indigo-600 mr-2">
                      +{event.points} points
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}