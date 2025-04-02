import React from 'react';
import { AlertOctagon, Check, Save, Trash, Trash2 } from 'lucide-react';

const ConfirmDialog = ({ type = 'delete', message, onConfirm, onCancel }) => {
  // icon and colors based on action 
  const getIcon = () => {
    switch (type) {
      case 'add':
        return <Save size={24} className="text-blue-500" />;
      case 'update':
        return <Check size={24} className="text-green-500" />;
      case 'deleteAll':
        return <Trash2 size={24} className="text-red-500" />;
      case 'delete':
      default:
        return <Trash size={24} className="text-red-500" />;
    }
  };
  
  const getButtonColors = () => {
    switch (type) {
      case 'add':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'update':
        return 'bg-green-600 hover:bg-green-700';
      case 'deleteAll':
        return 'bg-red-600 hover:bg-red-700';
      case 'delete':
      default:
        return 'bg-red-600 hover:bg-red-700';
    }
  };

  return (
    <div className="fixed inset-0 bg-[#000000ab] bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl transform transition-all">
        <div className="flex flex-col items-center mb-5">
          <div className={`rounded-full p-3 mb-3 ${
            type === 'delete' || type === 'deleteAll' ? 'bg-red-100' : 
            type === 'update' ? 'bg-green-100' : 'bg-blue-100'}`}>
            {getIcon()}
          </div>
          <h3 className="text-lg font-medium text-gray-900 text-center">{message}</h3>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2 ${getButtonColors()} text-white rounded-lg font-medium transition-colors shadow-sm`}
          >
            {type === 'deleteAll' ? 'Delete All' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;