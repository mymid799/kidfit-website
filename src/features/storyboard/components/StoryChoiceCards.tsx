/**
 * StoryChoiceCards — Reusable choice grid for the interactive story.
 * Used in both the "Challenge" phase and the "Empathy" phase.
 * 
 * Design: Large, kid-friendly tap targets with emojis/icons and Vietnamese labels.
 * Fully matches the existing KidFit Pro design system.
 */

import React from 'react';
import { motion } from 'motion/react';

interface ChoiceOption {
    id: string;
    icon?: string;
    label: string;
    label_en?: string;
}

interface StoryChoiceCardsProps {
    options: ChoiceOption[];
    onSelect: (id: string) => void;
    disabled?: boolean;
}

export const StoryChoiceCards: React.FC<StoryChoiceCardsProps> = ({ options, onSelect, disabled }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {options.map((option, i) => (
                <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12, duration: 0.4 }}
                    onClick={() => !disabled && onSelect(option.id)}
                    disabled={disabled}
                    className={`
                        relative group flex flex-col items-center gap-3 p-6 rounded-3xl 
                        bg-white border-2 border-slate-100 shadow-md
                        hover:border-primary/50 hover:shadow-xl hover:-translate-y-1
                        active:scale-95 active:shadow-md
                        transition-all duration-200 cursor-pointer
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
                    `}
                >
                    {/* Emoji/icon */}
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-200">
                        {option.icon || '✨'}
                    </span>

                    {/* Vietnamese label */}
                    <span className="text-sm font-black text-slate-800 text-center leading-snug">
                        {option.label}
                    </span>

                    {/* English label (if available) */}
                    {option.label_en && (
                        <span className="text-[11px] font-medium text-slate-400 text-center leading-snug">
                            {option.label_en}
                        </span>
                    )}

                    {/* Hover glow */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.button>
            ))}
        </div>
    );
};
