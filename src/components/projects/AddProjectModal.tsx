import React, { useState } from "react";
import { motion } from "framer-motion";
import { ApiServiceProject } from "../../services/apiServiceProject";

interface AddProjectModalProps {
  isOpen: Boolean;
  onClose: () => void;
  onProjectAdded: () => void;
}

export default function AddProjectModal({ isOpen, onClose, onProjectAdded }: AddProjectModalProps) {
  const [nama, setNama] = useState("");
  const [description, setDescription] = useState("");
  const [start_Date, setStart_Date] = useState("");
  const [end_Date, setEnd_Date] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newProject = { nama, description, start_Date, end_Date, status };
      await ApiServiceProject.createProject(newProject);
      onProjectAdded();
      onClose();
    } catch (err) {
      console.error("GAGAL FETCH");
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex item-center justify-center bg-gray-800 bg-opacity-50">
      <motion.div className="bg-slate-700 p-6 rounded-lg shadow-lg w-2/5 h-4/5 m-auto" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }}>
        <h2 className="text-xl text-zinc-300 text-center font-semibold mb-4">+ Tambah Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm text-zinc-300 font-medium mb-2">Nama</label>
            <input type="text" className="w-full bg-slate-300 outline outline-4 outline-offset-0 outline-pink-600 focus:outline-lime-700 rounded p-2" value={nama} onChange={(e) => setNama(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="block text-sm text-zinc-300 font-medium mb-2">Description</label>
            <input type="text" className="w-full bg-slate-300 outline outline-4 outline-offset-0 outline-pink-600 focus:outline-lime-700 rounded p-2" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="block text-sm text-zinc-300 font-medium mb-2">Start Date</label>
            <input type="date" className="w-full bg-slate-300 outline outline-4 outline-offset-0 outline-pink-600 focus:outline-lime-700 rounded p-2" value={start_Date} onChange={(e) => setStart_Date(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="block text-sm text-zinc-300 font-medium mb-2">End Date</label>
            <input type="date" className="w-full bg-slate-300 outline outline-4 outline-offset-0 outline-pink-600 focus:outline-lime-700 rounded p-2" value={end_Date} onChange={(e) => setEnd_Date(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-zinc-300 mb-2">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-slate-300 outline outline-4 outline-offset-0 outline-pink-600 focus:outline-lime-700 rounded p-2">
              <option selected>--Pilih Status--</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <motion.button type="button" className="px-4 py-2 bg-gray-400 hover:bg-gray-600 text-white rounded" onClick={onClose}>
              Cancel
            </motion.button>

            <motion.button type="submit" className="px-4 py-2 bg-lime-600 hover:bg-lime-800 text-white rounded">
              Add Project
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
