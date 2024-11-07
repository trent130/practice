import React from 'react';
import { Laptop, Lock, Binary, Network, Database, Shield } from 'lucide-react';
import type { Challenge } from '../types';

const categories = [
  { name: 'Web', icon: Laptop, color: 'text-blue-500' },
  { name: 'Cryptography', icon: Lock, color: 'text-purple-500' },
  { name: 'Binary', icon: Binary, color: 'text-red-500' },
  { name: 'Network', icon: Network, color: 'text-green-500' },
  { name: 'Forensics', icon: Database, color: 'text-yellow-500' },
  { name: 'Misc', icon: Shield, color: 'text-gray-500' }
];

interface ChallengeCategoriesProps {
  challenges: Challenge[];
  onSelectCategory: (category: string) => void;
}

export default function ChallengeCategories({ challenges, onSelectCategory }: ChallengeCategoriesProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map(({ name, icon: Icon, color }) => {
        const count = challenges.filter(c => c.category === name).length;
        return (
          <button
            key={name}
            onClick={() => onSelectCategory(name)}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center space-y-2">
              <Icon className={color} size={24} />
              <h3 className="font-medium text-gray-900">{name}</h3>
              <span className="text-sm text-gray-500">{count} challenges</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}