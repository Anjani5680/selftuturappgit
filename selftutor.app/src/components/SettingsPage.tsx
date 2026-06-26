import React, { useState } from "react";
import { AVATARS } from "../data";
import { Shield, Volume2, Globe, Sparkles, Trash2, CheckCircle2 } from "lucide-react";

interface SettingsPageProps {
  studentName: string;
  setStudentName: (name: string) => void;
  studentAvatar: string;
  setStudentAvatar: (avatar: string) => void;
  onResetProgress: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  studentName,
  setStudentName,
  studentAvatar,
  setStudentAvatar,
  onResetProgress,
}) => {
  const [tempName, setTempName] = useState(studentName);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempName.trim()) return;
    setStudentName(tempName);
    setSuccessMsg("Settings saved successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all your progress stars, completed lessons, and custom strengths? This cannot be undone.")) {
      onResetProgress();
      setSuccessMsg("Progress database wiped clean!");
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  return (
    <div id="settings-page" className="max-w-2xl w-full mx-auto px-4 py-6 text-left">
      <div className="bg-white/80 backdrop-blur-md border border-white/40 shadow-xl rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xl font-display font-extrabold text-slate-800 tracking-tight">
            Tutor & Companion Preferences
          </h2>
          <p className="text-xs text-slate-400 font-medium">Customize your study buddy mascot and reset application databases.</p>
        </div>

        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-display font-bold">
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Change Name */}
          <div>
            <label className="block text-xs font-display font-bold text-slate-700 uppercase tracking-wider mb-2">
              Explorer Name:
            </label>
            <input
              id="input-settings-name"
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 rounded-xl px-4 py-3 font-display font-semibold text-slate-800 shadow-sm outline-none transition-colors"
              required
            />
          </div>

          {/* Swap Companion Avatar */}
          <div>
            <label className="block text-xs font-display font-bold text-slate-700 uppercase tracking-wider mb-3">
              Swap Study Buddy Avatar:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {AVATARS.map((avatar) => {
                const isSelected = studentAvatar === avatar.id;
                return (
                  <button
                    id={`btn-settings-avatar-${avatar.id}`}
                    key={avatar.id}
                    type="button"
                    onClick={() => setStudentAvatar(avatar.id)}
                    className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? "border-blue-500 bg-blue-50/50 scale-105 shadow-md shadow-blue-100"
                        : "border-slate-100 bg-slate-50 hover:bg-slate-100"
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

          {/* Sound & Speech Settings */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-display font-extrabold text-slate-700 uppercase tracking-wider">
              Sound & Reading Presets:
            </h4>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <Volume2 className="text-slate-400 w-5 h-5" />
                  <span className="text-xs font-display font-bold text-slate-700">Mascot Voice Synthesis Reading</span>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full uppercase font-bold font-display">Active</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <Globe className="text-slate-400 w-5 h-5" />
                  <span className="text-xs font-display font-bold text-slate-700">Localized Multi-Language Translators</span>
                </div>
                <span className="text-[10px] bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full uppercase font-bold font-display">Active</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
            <button
              id="btn-settings-save"
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-display font-bold py-3 px-6 rounded-2xl shadow-lg transition-all cursor-pointer"
            >
              Save Preferences
              <Sparkles className="w-4 h-4 text-amber-300" />
            </button>

            <button
              id="btn-settings-reset"
              type="button"
              onClick={handleReset}
              className="flex items-center justify-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-100/50 font-display font-bold py-3 px-6 rounded-2xl text-xs transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Reset All Progress DB
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
