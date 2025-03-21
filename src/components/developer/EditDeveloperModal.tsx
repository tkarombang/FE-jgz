import React, { useState, useEffect } from "react";
import { ApiServiceDev, Developer } from "../../services/apiServiceDev";

interface EditDeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
  developer: Developer | null;
  onDeveloperUpdated: () => void;
}

export default function EditDeveloperModal({ isOpen, onClose, developer, onDeveloperUpdated }: EditDeveloperModalProps) {
  const [formData, setFormData] = useState<Developer>(
    developer || {
      developerId: 0,
      nama: "",
      email: "",
      role: "",
      phone: "",
      tanggalLahir: "",
      status: null,
      gender: null,
    },
  );

  useEffect(() => {
    if (developer) {
      setFormData(developer);
    }
  }, [developer]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ApiServiceDev.updateDeveloper(formData);
      onDeveloperUpdated();
      onClose();
    } catch (err) {
      console.error("GAGAL MERUBAH DEVELOPER", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-slate-800 p-6 rounded-lg w-3/5 transition-all scale-95 animate-fade-in" tabIndex={-1}>
        <h2 className="text-xl text-zinc-300 font-bold mb-4">Edit Developer</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row items-center justify-around mb-5 ">
            <label className="block text-sm text-zinc-300 font-medium mr-2 w-16">Nama:</label>
            <input type="text" name="nama" value={formData.nama} onChange={handleChange} className="text-zinc-800 w-full bg-slate-300 outline outline-4 outline-offset-0 outline-pink-600 focus:outline-lime-700 rounded p-2" />
          </div>

          <div className="flex flex-row items-center justify-around mb-5">
            <label className="block text-sm text-zinc-300 font-medium mr-2 mr-2 w-16">Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="text-zinc-800 w-full bg-slate-300 outline outline-4 outline-offset-0 outline-pink-600 focus:outline-lime-700 rounded p-2" />
          </div>

          <div className="flex flex-row items-center justify-around mb-5">
            <label className="block text-sm text-zinc-300 font-medium mr-2 w-16">Role:</label>
            <input type="text" name="role" value={formData.role} onChange={handleChange} className="text-zinc-800 w-full bg-slate-300 outline outline-4 outline-offset-0 outline-pink-600 focus:outline-lime-700 rounded p-2" />
          </div>

          <div className="flex flex-row items-center justify-around mb-5">
            <label className="block text-sm text-zinc-300 font-medium mr-2 w-16">Phone:</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="text-zinc-800 w-full bg-slate-300 outline outline-4 outline-offset-0 outline-pink-600 focus:outline-lime-700 rounded p-2" />
          </div>

          <div className="flex justify-end mt-4">
            <button type="button" className="px-4 py-2 bg-gray-400 hover:bg-gray-600 text-white rounded mr-2" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="px-4 py-2 bg-lime-600 hover:bg-lime-800 text-white rounded">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
