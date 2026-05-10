import React from 'react';
import { LucideIcon } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard.tsx';

interface StatsCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon: Icon, color }) => {
  return (
    <GlassCard className="p-6 hover:scale-105 transition-transform duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-700 dark:text-gray-400 font-medium">{label}</p>
          <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-gray-200">{value}</p>
        </div>
        <div className={`${color} p-2 rounded-xl self-start`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </GlassCard>
  );
};