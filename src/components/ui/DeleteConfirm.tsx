import React from "react";

interface DeleteProps {
  isOpenDel: boolean;
  onCloseDel: () => void;
  developerId: number | null;
  onConfirm: () => void;
}

const AlertDelete: React.FC<DeleteProps> = ({ isOpenDel, onCloseDel, developerId, onConfirm }) => {
  if (!isOpenDel) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-slate-700 p-6 rounded-lg shadow-lg transform transition-all scale-95 animate-fade-in" tabIndex={-1}>
        <h2 className="text-xl text-stone-300 font-bold mb-4">Yakin Ingin Menghapus ID {developerId} ?</h2>
        <div className="flex justify-around">
          <button className="bg-rose-400 text-white px-4 py-2 rounded hover:bg-rose-600" onClick={onConfirm}>
            Ya!
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={onCloseDel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDelete;
