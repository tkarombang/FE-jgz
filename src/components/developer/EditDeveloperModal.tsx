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
      phone: null,
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
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Edit Developer</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Nama:
            <input type="text" name="nama" value={formData.nama} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
          </label>

          <label className="block mb-2">
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
          </label>

          <label className="block mb-2">
            Role:
            <input type="text" name="role" value={formData.role} onChange={handleChange} className="w-full px-2 py-1 border rounded" />
          </label>

          <div className="flex justify-end mt-4">
            <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded mr-2" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
