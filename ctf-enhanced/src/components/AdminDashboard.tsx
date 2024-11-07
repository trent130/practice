import React, { useState } from 'react';
import { Plus, Settings, Users, Flag, Award, BarChart } from 'lucide-react';
import ChallengeForm from './ChallengeForm';  // Assuming you have a form component for adding challenges
import UserForm from './UserForm';           // Assuming you have a form component for adding users
import TeamForm from './TeamForm';           // Assuming you have a form component for adding teams

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'challenges' | 'users' | 'teams' | 'settings'>('challenges');
  const [showChallengeForm, setShowChallengeForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showTeamForm, setShowTeamForm] = useState(false);

  const handleChallengeSubmit = (challenge) => {
    console.log('New challenge:', challenge);
    setShowChallengeForm(false);
  };

  const handleUserSubmit = (user) => {
    console.log('New user:', user);
    setShowUserForm(false);
  };

  const handleTeamSubmit = (team) => {
    console.log('New team:', team);
    setShowTeamForm(false);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {['challenges', 'users', 'teams', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'challenges' && <Flag className="mr-2 h-5 w-5" />}
                {tab === 'users' && <Users className="mr-2 h-5 w-5" />}
                {tab === 'teams' && <Award className="mr-2 h-5 w-5" />}
                {tab === 'settings' && <Settings className="mr-2 h-5 w-5" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'challenges' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Challenge Management</h2>
                <button
                  onClick={() => setShowChallengeForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  New Challenge
                </button>
              </div>
              <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
                {/* Challenge list would go here */}
                <div className="p-6">
                  <p className="text-gray-500 text-center">No challenges created yet</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">User Management</h2>
                <button
                  onClick={() => setShowUserForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add User
                </button>
              </div>
              <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
                {/* User list would go here */}
                <div className="p-6">
                  <p className="text-gray-500 text-center">No users found</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'teams' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Team Management</h2>
                <button
                  onClick={() => setShowTeamForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Create Team
                </button>
              </div>
              <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
                {/* Team list would go here */}
                <div className="p-6">
                  <p className="text-gray-500 text-center">No teams created yet</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Platform Settings</h2>
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  <BarChart className="mr-2 h-5 w-5" />
                  View Stats
                </button>
              </div>
              <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
                {/* Settings form would go here */}
                <div className="p-6">
                  <p className="text-gray-500 text-center">Settings panel coming soon</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showChallengeForm && (
        <ChallengeForm onSubmit={handleChallengeSubmit} onClose={() => setShowChallengeForm(false)} />
      )}
      {showUserForm && (
        <UserForm onSubmit={handleUserSubmit} onClose={() => setShowUserForm(false)} />
      )}
      {showTeamForm && (
        <TeamForm onSubmit={handleTeamSubmit} onClose={() => setShowTeamForm(false)} />
      )}
    </main>
  );
}
