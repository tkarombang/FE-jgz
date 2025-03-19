import React, { useState } from "react";
import { ApiServiceDev } from "../../services/apiServiceDev";

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
    <div className="fixed inset-0 flex item-center justify-center, bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Tambah Developer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium">Nama</label>
            <input type="text" className="w-full border rounded p-2" value={nama} onChange={(e) => setNama(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Email</label>
            <input type="email" className="w-full border rounded p-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Role</label>
            <input type="text" className="w-full border rounded p-2" value={role} onChange={(e) => setRole(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Phone</label>
            <input type="number" className="w-full border rounded p-2" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">Date</label>
            <input type="date" className="w-full border rounded p-2" value={tanggalLahir} onChange={(e) => setTanggalLahir(e.target.value)} required />
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" className="px-4 py-2 bg-gray-400 text-white rounded" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" disabled={isLoading}>
              {isLoading ? "Menambahkan..." : "Add Dev"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
