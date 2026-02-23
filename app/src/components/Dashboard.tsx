import { Check, Copy, Edit2, Loader2, LogOut, Moon, Plus, Search, SortAsc, SortDesc, Sun, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { useCredentials } from '../hooks/useCredentials';
import { decryptPassword } from '../lib/encryption';
import { auth } from '../lib/firebase';
import type { Credential } from '../types';
import { useAuth } from './AuthProvider';
import CredentialModal from './CredentialModal';
import DeleteModal from './DeleteModal';
import { useTheme } from './ThemeProvider';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const {
    credentials: filteredCredentials,
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
    isDataLoading,
    isActionLoading,
    addCredential,
    editCredential,
    removeCredential
  } = useCredentials(user?.uid);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCredential, setEditingCredential] = useState<Credential | null>(null);
  const [deletingCredential, setDeletingCredential] = useState<Credential | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleAdd = async (data: Partial<Credential>) => {
    try {
      await addCredential(data);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (data: Partial<Credential>) => {
    if (!editingCredential) return;
    try {
      await editCredential(editingCredential.id, data);
      setEditingCredential(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!deletingCredential) return;
    try {
      await removeCredential(deletingCredential.id);
      setIsDeleteModalOpen(false);
      setDeletingCredential(null);
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    const decryptedPassword = decryptPassword(text);
    navigator.clipboard.writeText(decryptedPassword);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="py-8">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2 font-display">
            Vault
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your digital identity securely.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:scale-105 transition-all"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button
            onClick={() => auth.signOut()}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all font-medium"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
          <button
            onClick={() => {
              setEditingCredential(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 rounded-xl shadow-lg shadow-cyan-600/20 transition-all font-semibold active:scale-95"
          >
            <Plus size={20} />
            <span>Add New</span>
          </button>
        </div>
      </div>

      {/* Search and Sort */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by application or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-none focus:ring-2 focus:ring-cyan-500 outline-none placeholder-slate-400"
          />
        </div>
        <button
          onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
          className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-900 transition-all font-medium whitespace-nowrap"
        >
          {sortOrder === 'asc' ? <SortAsc size={18} /> : <SortDesc size={18} />}
          <span>Sort by Name</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">Used For</th>
                <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">Account</th>
                <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">Password</th>
                <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">Created Date</th>
                <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {isDataLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20">
                    <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
                      <Loader2 className="animate-spin" size={32} />
                      <p className="italic animate-pulse">Scanning the vault...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredCredentials.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-slate-400 italic">
                    No credentials found. Start by adding one!
                  </td>
                </tr>
              ) : (
                filteredCredentials.map((cred) => (
                  <tr key={cred.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors group">
                    <td className="px-6 py-5">
                      <span className="font-bold text-slate-800 dark:text-white text-lg">{cred.usedFor}</span>
                    </td>
                    <td className="px-6 py-5 text-slate-600 dark:text-slate-300 font-medium">{cred.account}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-400 select-none">••••••••</span>
                        <button
                          onClick={() => copyToClipboard(cred.password, cred.id)}
                          className="p-2 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 text-cyan-600 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                          title="Copy Password"
                        >
                          {copiedId === cred.id ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-slate-400 text-sm">
                      {cred.createdDate?.toDate().toLocaleDateString('en-GB').replace(/\//g, ' - ') || 'N/A'}
                    </td>
                    <td className="px-6 py-5 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingCredential(cred);
                          setIsModalOpen(true);
                        }}
                        className="p-2.5 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-xl transition-all"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setDeletingCredential(cred);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CredentialModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCredential(null);
        }}
        onSubmit={editingCredential ? handleEdit : handleAdd}
        initialData={editingCredential}
        isLoading={isActionLoading}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingCredential(null);
        }}
        onConfirm={handleDelete}
        itemLabel={deletingCredential?.usedFor || ''}
        isLoading={isActionLoading}
      />
    </div>
  );
};

export default Dashboard;
