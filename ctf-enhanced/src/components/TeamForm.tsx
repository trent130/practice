import React, { useState } from 'react';

interface TeamFormProps {
  onSubmit: (data: { teamName: string; teamLeader: string }) => void;
  onClose: () => void;
}

export default function TeamForm({ onSubmit, onClose }: TeamFormProps) {
  const [teamName, setTeamName] = useState<string>('');
  const [teamLeader, setTeamLeader] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ teamName, teamLeader });
    setTeamName('');
    setTeamLeader('');
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-medium text-gray-900 mb-4">Create New Team</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Team Name</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Team Leader</label>
            <input
              type="text"
              value={teamLeader}
              onChange={(e) => setTeamLeader(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
