import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  Icon: LucideIcon;
  color: string;
}

export default function StatsCard({ title, value, Icon, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-3">
        <Icon className={`text-${color}`} size={24} />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className={`text-3xl font-bold text-${color}`}>{value}</p>
        </div>
      </div>
    </div>
  );
}