import React, { useState } from 'react';
import { Users, UserPlus, Settings, Shield, Mail, Clock } from 'lucide-react';
import type { Team, User } from '../types';
import InviteMemberModal from './InviteMemberModal';

interface TeamManagementProps {
  team: Team;
  onInviteMember: (email: string) => void;
}

export default function TeamManagement({ team, onInviteMember }: TeamManagementProps) {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [pendingInvites] = useState([
    { email: 'pending@hacker.com', sent: new Date().toISOString() },
    { email: 'waiting@ctf.com', sent: new Date().toISOString() },
  ]);

  const handleInvite = (email: string) => {
    onInviteMember(email);
    setIsInviteModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="text-indigo-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">{team.name}</h2>
            </div>
            <button className="p-2 text-gray-600 hover:text-indigo-600">
              <Settings size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <UserPlus size={16} className="mr-2" />
              Invite Member
            </button>
          </div>

          <div className="space-y-4 mb-8">
            {team.members.map((member: User) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={member.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop'}
                    alt={member.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{member.username}</p>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
                {member.role === 'team_leader' && (
                  <Shield className="text-indigo-600" size={20} />
                )}
              </div>
            ))}
          </div>

          {pendingInvites.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Invites</h3>
              <div className="space-y-3">
                {pendingInvites.map((invite, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-yellow-50"
                  >
                    <div className="flex items-center space-x-3">
                      <Mail className="text-yellow-600" size={20} />
                      <div>
                        <p className="font-medium text-gray-900">{invite.email}</p>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Clock size={14} />
                          <span>Sent {new Date(invite.sent).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      className="text-sm text-indigo-600 hover:text-indigo-700"
                      onClick={() => handleInvite(invite.email)}
                    >
                      Resend
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInvite}
      />
    </>
  );
}