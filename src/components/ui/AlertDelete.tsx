import React, { useState } from "react";
import { motion } from "framer-motion";
import { Alert } from "flowbite-react";

interface DeleteProps {
  isOpenDel: boolean;
  onCloseDel: () => void;
  developerId: number | null;
  onConfirm: () => void;
}

const AlertDelete: React.FC<DeleteProps> = ({ isOpenDel, onCloseDel, developerId, onConfirm }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "failure" | null>(null);

  // Handler untuk tombol "Ya!" yang akan memicu alert
  const handleConfirm = () => {
    console.log("AlertDelete: Confirm Deletion");
    onConfirm();
    setAlertType("success");
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
  };

  if (!isOpenDel) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div className="bg-slate-700 p-6 rounded-lg shadow-lg" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.4 }} transition={{ duration: 0.2 }}>
        <h2 className="text-xl text-stone-300 font-bold mb-4">Yakin Ingin Menghapus ID {developerId} ?</h2>
        <div className="flex justify-around">
          <button className="bg-rose-400 text-white px-4 py-2 rounded hover:bg-rose-600" onClick={handleConfirm}>
            Ya!
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={onCloseDel}>
            Cancel
          </button>
        </div>
      </motion.div>

      {showAlert && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="absolute top-4 right-4">
          <Alert color={alertType === "success" ? "success" : "failure"} onDismiss={() => setShowAlert(false)}>
            <span className="font-medium">{alertType === "success" ? "Success!" : "Error!"}</span>
            {alertType === "success" ? " Developer has been deleted." : " Failed to delete developer."}
          </Alert>
        </motion.div>
      )}
    </div>
  );
};

export default AlertDelete;
