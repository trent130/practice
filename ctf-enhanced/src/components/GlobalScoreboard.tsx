import React, { useState } from 'react';
import { Trophy, TrendingUp, Medal, Search } from 'lucide-react';

interface ScoreboardEntry {
  rank: number;
  team: string;
  score: number;
  solved: number;
  lastSolve: Date;
  trend: 'up' | 'down' | 'stable';
}

const mockScoreboard: ScoreboardEntry[] = [
  {
    rank: 1,
    team: 'Binary Bandits',
    score: 4500,
    solved: 12,
    lastSolve: new Date(),
    trend: 'up'
  },
  {
    rank: 2,
    team: 'Hack Heroes',
    score: 4200,
    solved: 11,
    lastSolve: new Date(Date.now() - 900000),
    trend: 'stable'
  },
  {
    rank: 3,
    team: 'Security Squad',
    score: 3800,
    solved: 10,
    lastSolve: new Date(Date.now() - 1800000),
    trend: 'down'
  }
];

export default function GlobalScoreboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState<'all' | '24h' | '1h'>('all');

  const filteredScoreboard = mockScoreboard.filter(entry =>
    entry.team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Trophy className="text-yellow-500" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Global Scoreboard</h2>
          </div>
          <div className="flex space-x-2">
            {['all', '24h', '1h'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range as typeof timeRange)}
                className={`px-3 py-1 text-sm rounded-md ${
                  timeRange === range
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range === 'all' ? 'All Time' : range}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search teams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Solved
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Solve
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trend
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredScoreboard.map((entry) => (
              <tr key={entry.rank} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {entry.rank <= 3 ? (
                      <Medal
                        size={20}
                        className={
                          entry.rank === 1
                            ? 'text-yellow-500'
                            : entry.rank === 2
                            ? 'text-gray-400'
                            : 'text-amber-700'
                        }
                      />
                    ) : (
                      <span className="text-gray-900 font-medium">#{entry.rank}</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{entry.team}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{entry.score}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{entry.solved}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {entry.lastSolve.toLocaleTimeString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <TrendingUp
                    size={16}
                    className={
                      entry.trend === 'up'
                        ? 'text-green-500'
                        : entry.trend === 'down'
                        ? 'text-red-500'
                        : 'text-gray-500'
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}