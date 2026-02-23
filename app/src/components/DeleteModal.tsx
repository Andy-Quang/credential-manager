import { AlertTriangle } from 'lucide-react';
import React from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemLabel: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm, itemLabel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Delete Credential?</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Are you sure you want to delete the credentials for <span className="font-semibold text-slate-700 dark:text-slate-200">"{itemLabel}"</span>? This action cannot be undone.
          </p>
          
          <div className="flex w-full gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors font-medium text-slate-700 dark:text-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-red-600/20 active:scale-95"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
