import { Loader2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { Credential } from '../types';

interface CredentialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Credential>) => void;
  initialData?: Credential | null;
  isLoading?: boolean;
}

const CredentialModal: React.FC<CredentialModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData,
  isLoading = false 
}) => {
  const [usedFor, setUsedFor] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (initialData) {
      setUsedFor(initialData.usedFor);
      setAccount(initialData.account);
      setPassword(initialData.password);
    } else {
      setUsedFor('');
      setAccount('');
      setPassword('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            {initialData ? 'Edit Credential' : 'Add New Credential'}
          </h2>
          <button 
            onClick={onClose} 
            disabled={isLoading}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ usedFor, account, password });
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-600 dark:text-slate-400">Used For</label>
            <input
              type="text"
              value={usedFor}
              onChange={(e) => setUsedFor(e.target.value)}
              disabled={isLoading}
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="e.g. Gmail, Amazon, etc."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-600 dark:text-slate-400">Account</label>
            <input
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              disabled={isLoading}
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Username or Email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-600 dark:text-slate-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              required
            />
          </div>
          
          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-3 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors font-medium text-slate-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-cyan-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="animate-spin" size={18} />}
              {initialData ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CredentialModal;
