import React, { useState } from 'react';
import { Brain, Flag, Trophy, User2 } from 'lucide-react';
import Navbar from './components/Navbar';
import ChallengeCard from './components/ChallengeCard';
import Leaderboard from './components/LeaderBoard';
import StatsCard from './components/StatsCard';
import ProfileCard from './components/ProfileCard';
import TeamManagement from './components/TeamManagement';
import TeamsView from './components/TeamsView';
import ChallengeCategories from './components/ChallengeCategories';
import AdminDashboard from './components/AdminDashboard';
import LiveEventsFeed from './components/LiveEventsFeed';
import GlobalScoreboard from './components/GlobalScoreboard';
import type { Challenge, Team, User } from './types';

const mockUser: User = {
  id: '1',
  username: 'HackMaster',
  email: 'hack@master.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
  role: 'team_leader',
  score: 2500,
  solvedChallenges: ['1', '2', '3']
};

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Hidden in Plain Sight',
    category: 'Web',
    description: 'Can you find the secret hidden in the source code?',
    points: 100,
    difficulty: 'easy',
    solved: false,
    hints: ['Check the HTML comments'],
    solvedBy: 45
  },
  {
    id: '2',
    title: 'Binary Puzzle',
    category: 'Binary',
    description: 'Reverse engineer this binary to find the flag.',
    points: 300,
    difficulty: 'medium',
    solved: false,
    hints: ['Look for hidden functions'],
    solvedBy: 23
  },
  {
    id: '3',
    title: 'Crypto Master',
    category: 'Cryptography',
    description: 'Decrypt the message using advanced techniques.',
    points: 500,
    difficulty: 'hard',
    solved: false,
    hints: ['Consider modern encryption methods'],
    solvedBy: 12
  }
];

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Binary Bandits',
    members: [mockUser],
    score: 2500,
    rank: 1
  },
  {
    id: '2',
    name: 'Hack Heroes',
    members: [
      {
        id: '2',
        username: 'CyberNinja',
        email: 'cyber@ninja.com',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        role: 'team_leader',
        score: 2000,
        solvedChallenges: ['1', '2']
      }
    ],
    score: 2000,
    rank: 2
  },
  {
    id: '3',
    name: 'Security Squad',
    members: [
      {
        id: '3',
        username: 'ByteMaster',
        email: 'byte@master.com',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop',
        role: 'team_leader',
        score: 1800,
        solvedChallenges: ['1']
      }
    ],
    score: 1800,
    rank: 3
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState<'challenges' | 'profile' | 'team' | 'teams' | 'admin' | 'scoreboard'>('challenges');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleFlagSubmit = (flag: string) => {
    console.log('Flag submitted:', flag);
  };

  const handleInviteMember = (email: string) => {
    console.log('Inviting member:', email);
  };

  const handleJoinTeam = (teamId: string) => {
    console.log('Requesting to join team:', teamId);
  };

  const filteredChallenges = selectedCategory
    ? mockChallenges.filter(c => c.category === selectedCategory)
    : mockChallenges;

  if (currentPage === 'admin') {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar onPageChange={setCurrentPage} />
        <AdminDashboard />
      </div>
    );
  }

  if (currentPage === 'scoreboard') {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar onPageChange={setCurrentPage} />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <GlobalScoreboard />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onPageChange={setCurrentPage} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Active Challenges"
            value={mockChallenges.length}
            Icon={Brain}
            color="indigo-600"
          />
          <StatsCard
            title="Your Score"
            value={mockUser.score}
            Icon={Flag}
            color="green-600"
          />
          <StatsCard
            title="Your Rank"
            value="#5"
            Icon={Trophy}
            color="yellow-500"
          />
        </div>

        {currentPage === 'challenges' && (
          <div className="space-y-8">
            <ChallengeCategories
              challenges={mockChallenges}
              onSelectCategory={setSelectedCategory}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCategory || 'All'} Challenges
                  </h2>
                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      Show All
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredChallenges.map((challenge) => (
                    <ChallengeCard
                      key={challenge.id}
                      challenge={challenge}
                      onSubmit={handleFlagSubmit}
                    />
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1 space-y-6">
                <LiveEventsFeed />
                <Leaderboard teams={mockTeams} />
              </div>
            </div>
          </div>
        )}

        {currentPage === 'teams' && (
          <TeamsView
            teams={mockTeams}
            onJoinTeam={handleJoinTeam}
          />
        )}

        {currentPage === 'profile' && (
          <div className="max-w-2xl mx-auto">
            <ProfileCard user={mockUser} />
          </div>
        )}

        {currentPage === 'team' && (
          <div className="max-w-3xl mx-auto">
            <TeamManagement
              team={mockTeams[0]}
              onInviteMember={handleInviteMember}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;