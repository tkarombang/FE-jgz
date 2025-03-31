import React, { useState, useEffect } from "react";
import { ApiServiceProject, Project } from "../services/apiServiceProject";
import { motion } from "framer-motion";
import { Alert } from "flowbite-react";

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onProjectUpdated: () => void;
}

export default function EditProjectModal({ isOpen, onClose, project, onProjectUpdated }: EditProjectModalProps) {
  const [formData, setFormData] = useState<Project>({
    projectId: project?.projectId ?? 0,
    nama: project?.nama ?? "",
    description: project?.description ?? "",
    start_Date: project?.start_Date ?? null,
    end_Date: project?.end_Date ?? null,
    status: project?.status ?? "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData(project);
    }
  }, [project]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "start_Date" || name === "end_Date") {
      setFormData({ ...formData, [name]: value ? `${value}T00:00:00Z` : null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await ApiServiceProject.updateProject(formData);
      onProjectUpdated();
      setShowAlert(true);
    } catch (err) {
      console.error("GAGAL MERUBAH PROJECT");
    } finally {
      setTimeout(() => {
        setShowAlert(false);
        setIsLoading(false);
        onClose();
      }, 1500);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <motion.div className="bg-slate-700 p-6 rounded-lg w-3/5" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.4 }} transition={{ duration: 0.2 }}>
        <h2 className="text-xl text-zinc-300 font-bold mb-4">Edit Project</h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-row items-center justify-around mb-5 ">
            <label className="block text-sm text-zinc-300 font-medium mr-8 w-20">Nama:</label>
            <input
              type="text"
              name="nama"
              value={formData.nama || ""}
              onChange={handleChange}
              className="text-zinc-800 w-full bg-slate-300 outline outline-4 outline-offset-0 outline-pink-600 focus:outline-lime-700 rounded p-2"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-row items-center justify-around mb-5">
            <label className="block text-sm text-zinc-300 font-medium mr-8 w-20">Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="text-zinc-800 w-full bg-slate-300 outline outline-4 outline-offset-0 outline-pink-600 focus:outline-lime-700 rounded p-2"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-row items-center justify-around mb-5">
            <label className="block text-sm text-zinc-300 font-medium mr-8 w-20">Start Date:</label>
            <input
              type="date"
              name="start_Date"
              value={formData.start_Date ? formData.start_Date.substring(0, 10) : ""}
              onChange={handleChange}
              className="text-zinc-800 w-full bg-slate-300 outline outline-4 outline-offset-0 outline-pink-600 focus:outline-lime-700 rounded p-2"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-row items-center justify-around mb-5">
            <label className="block text-sm text-zinc-300 font-medium mr-8 w-20">End Date:</label>
            <input
              type="date"
              name="end_Date"
              value={formData.end_Date ? formData.end_Date.substring(0, 10) : ""}
              onChange={handleChange}
              className="text-zinc-800 w-full bg-slate-300 outline outline-4 outline-offset-0 outline-pink-600 focus:outline-lime-700 rounded p-2"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-row items-center justify-around mb-5">
            <label className="block text-sm text-zinc-300 font-medium mr-8 w-20">Status:</label>
            <select value={formData.status} name="status" onChange={handleChange} className="text-zinc-800 w-full bg-slate-300 outline outline-4 outline-offset-0 outline-pink-600 focus:outline-lime-700 rounded p-2" disabled={isLoading}>
              <option value="">--Pilih Status--</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="flex justify-end mt-4">
            <button type="button" className="px-4 py-2 bg-gray-400 hover:bg-gray-600 text-white rounded mr-2" onClick={onClose} disabled={isLoading}>
              Batal
            </button>
            <button type="submit" className="px-4 py-2 bg-lime-600 hover:bg-lime-800 text-white rounded" disabled={isLoading}>
              Update
            </button>
          </div>
        </form>
      </motion.div>

      {showAlert && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="absolute top-4 right-4">
          <Alert color="success" onDismiss={() => setShowAlert(false)}>
            <span className="font-medium">Success!</span>One Project has been updated.
          </Alert>
        </motion.div>
      )}
    </div>
  );
}
