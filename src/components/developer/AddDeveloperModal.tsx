import React, { useState } from "react";
import { ApiServiceDev } from "../../services/apiServiceDev";
import { motion } from "framer-motion";

interface AddDeveloperModalProps {
  isOpen: Boolean;
  onClose: () => void;
  onDeveloperAdded: () => void; //UNTUK REFRESH DAFTAR DEVELOPER AFTER ADD
}

export default function AddDeveloperModal({ isOpen, onClose, onDeveloperAdded }: AddDeveloperModalProps) {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newDeveloper = { nama, email, role, phone, tanggalLahir };
      await ApiServiceDev.createDeveloper(newDeveloper);
      onDeveloperAdded(); //REFRESH LIST
      onClose(); //TUTUP MODAL
    } catch (err) {
      console.error("GAGAL MENAMBAHKAN DEVELOPER BARU", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex item-center justify-center bg-gray-800 bg-opacity-50">
      <motion.div className="bg-slate-700 p-6 rounded-lg shadow-lg w-2/5 h-4/5 m-auto" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.4 }} transition={{ duration: 0.2 }}>
        <h2 className="text-xl text-zinc-300 text-center font-semibold mb-4">Tambah Developer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm text-zinc-300 font-medium mb-2">Nama</label>
            <input type="text" className="w-full bg-slate-300 outline outline-4 outline-offset-0 outline-pink-600 focus:outline-lime-700 rounded p-2" value={nama} onChange={(e) => setNama(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="block text-sm text-zinc-300 font-medium mb-2">Email</label>
            <input type="email" className="w-full bg-slate-300 outline outline-4 outline-offset-0 outline-pink-600 focus:outline-lime-700 rounded p-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="block text-sm text-zinc-300 font-medium mb-2">Role</label>
            <input type="text" className="w-full bg-slate-300 outline outline-4 outline-offset-0 outline-pink-600 focus:outline-lime-700 rounded p-2" value={role} onChange={(e) => setRole(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="block text-sm text-zinc-300 font-medium mb-2">Phone</label>
            <input type="number" className="w-full bg-slate-300 outline outline-4 outline-offset-0 outline-pink-600 focus:outline-lime-700 rounded p-2" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-zinc-300 mb-2">Date</label>
            <input type="date" className="w-full bg-slate-300 outline outline-4 outline-offset-0 outline-pink-600 focus:outline-lime-700 rounded p-2" value={tanggalLahir} onChange={(e) => setTanggalLahir(e.target.value)} required />
          </div>

          <div className="flex justify-end gap-2">
            <motion.button type="button" className="px-4 py-2 bg-gray-400 hover:bg-gray-600 text-white rounded" onClick={onClose}>
              Cancel
            </motion.button>

            <motion.button type="submit" className="px-4 py-2 bg-lime-600 hover:bg-lime-800 text-white rounded" disabled={isLoading}>
              {isLoading ? "Menambahkan..." : "Add Dev"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
