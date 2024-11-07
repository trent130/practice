import React, { useState } from 'react';
import { Flag, Lock, Award, HelpCircle, Eye, MessageSquare } from 'lucide-react';
import type { Challenge } from '../types';

interface ChallengeCardProps {
  challenge: Challenge;
  onSubmit: (flag: string) => void;
}

export default function ChallengeCard({ challenge, onSubmit }: ChallengeCardProps) {
  const [showSubmit, setShowSubmit] = useState(false);
  const [flag, setFlag] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [activeHint, setActiveHint] = useState(0);
  const [showDiscussion, setShowDiscussion] = useState(false);

  const handleHintReveal = (index: number) => {
    if (index > activeHint) {
      setActiveHint(index);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{challenge.title}</h3>
          <div className="flex items-center space-x-2">
            <Award size={16} className="text-yellow-500" />
            <span className="text-gray-600">{challenge.points} pts</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${challenge.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                challenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'}`}>
              {challenge.difficulty}
            </span>
            <span className="text-sm text-gray-500">
              {challenge.solvedBy} solves
            </span>
          </div>
          
          <p className="text-gray-600">{challenge.description}</p>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowHints(!showHints)}
              className="inline-flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
            >
              <HelpCircle size={16} />
              <span className="text-sm">Hints ({challenge.hints.length})</span>
            </button>
            <button
              onClick={() => setShowDiscussion(!showDiscussion)}
              className="inline-flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
            >
              <MessageSquare size={16} />
              <span className="text-sm">Discussion</span>
            </button>
          </div>
          
          {showHints && (
            <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
              {challenge.hints.map((hint, index) => (
                <div key={index} className="space-y-1">
                  {index <= activeHint ? (
                    <p className="text-sm text-gray-700">{hint}</p>
                  ) : (
                    <button
                      onClick={() => handleHintReveal(index)}
                      className="inline-flex items-center space-x-1 text-indigo-600 hover:text-indigo-700"
                    >
                      <Eye size={16} />
                      <span className="text-sm">Reveal Hint {index + 1}</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {showDiscussion && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div className="flex items-center space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop"
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          )}
          
          {!challenge.solved ? (
            <div className="space-y-2">
              {showSubmit ? (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={flag}
                    onChange={(e) => setFlag(e.target.value)}
                    placeholder="Enter flag"
                    className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    onClick={() => onSubmit(flag)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSubmit(true)}
                  className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
                >
                  <Flag size={16} />
                  <span>Submit Flag</span>
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-green-600">
              <Lock size={16} />
              <span>Solved</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}