import React, { useState } from "react";
import { AVATARS } from "../data";
import { Sparkles } from "lucide-react";

interface ProfileSetupPageProps {
  onSetupComplete: (name: string, avatarId: string) => void;
}

export const ProfileSetupPage: React.FC<ProfileSetupPageProps> = ({ onSetupComplete }) => {
  const [name, setName] = useState("Aarav");
  const [selectedAvatar, setSelectedAvatar] = useState("buddy");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSetupComplete(name, selectedAvatar);
  };

  return (
    <div id="profile-setup-page" className="max-w-xl w-full mx-auto px-4 py-8">
      {/* Centered Glass Card */}
      <div className="bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500"></div>

        {/* AI Orb Banner Speech */}
        <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-4 flex gap-3.5 items-center mb-8">
          <div className="text-3xl animate-pulse">🤖</div>
          <div className="text-left">
            <h4 className="text-xs font-mono tracking-wider text-purple-600 uppercase font-bold">AI Tutor Says:</h4>
            <p className="text-sm font-display font-medium text-slate-700 leading-snug">
              "Hi there! I'm so excited to be your study partner. Tell me your name and pick an avatar so we can get started!"
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight text-center">
          Tell your AI tutor about you
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6 text-left">
          {/* Student Name */}
          <div>
            <label className="block text-sm font-display font-bold text-slate-700 mb-2">
              Your Name:
            </label>
            <input
              id="input-student-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-purple-500 rounded-xl px-4 py-3 font-display font-semibold text-slate-800 shadow-sm outline-none transition-colors"
              placeholder="Enter your name..."
              required
            />
          </div>

          {/* Avatar Selection */}
          <div>
            <label className="block text-sm font-display font-bold text-slate-700 mb-3">
              Choose your Learning Character:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
              {AVATARS.map((avatar) => {
                const isSelected = selectedAvatar === avatar.id;
                return (
                  <button
                    id={`avatar-${avatar.id}`}
                    key={avatar.id}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar.id)}
                    className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? "border-purple-500 bg-purple-50/50 scale-105 shadow-md shadow-purple-100"
                        : "border-slate-100 bg-slate-50 hover:bg-slate-100 hover:border-slate-200"
                    }`}
                  >
                    <span className="text-3xl filter drop-shadow-sm mb-1.5">{avatar.emoji}</span>
                    <span className="text-[10px] font-display font-bold text-slate-600 truncate max-w-full">
                      {avatar.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <button
            id="btn-profile-submit"
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-95 text-white font-display font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-purple-200 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            Create My Profile
            <Sparkles className="w-4.5 h-4.5 text-amber-300 animate-pulse" />
          </button>
        </form>
      </div>
    </div>
  );
};
