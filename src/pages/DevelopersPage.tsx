import React, { useEffect, useState } from "react";
import { ApiServiceDev, Developer } from "../services/apiServiceDev";
import DeveloperTable from "../components/developer/DeveloperTable";
import AddDeveloperModal from "../components/developer/AddDeveloperModal";
import EditDeveloperModal from "../components/developer/EditDeveloperModal";

const DeveloperPage: React.FC = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null);

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {
    try {
      const dataDevs = await ApiServiceDev.getDevelopers();
      setDevelopers(dataDevs);
      setLoading(false);
    } catch (err) {
      console.error("GAGAL MENGAMBIL");
    }
  };

  const handleDeveloperEdit = (developer: Developer) => {
    setSelectedDeveloper(developer);
    setIsModalEditOpen(true);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Apakah Anda Yakin Untuk Menghapusnya");
    if (confirmDelete) {
      await ApiServiceDev.deleteDeveloper(id);
      setDevelopers(developers.filter((dev) => dev.developerId !== id));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3x1 font-bold mb-4">Daftar Developers</h1>
      <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded" onClick={() => setIsModalAddOpen(true)}>
        + Tambah Developer
      </button>

      {/* TAMPILKAN TABEL DEVELOPERS */}
      {loading ? <p className="text-center">Memuat Data...!</p> : <DeveloperTable developers={developers} onEdit={handleDeveloperEdit} onDelete={handleDelete} />}

      {/* TAMPILKAN MODAL ADD DEVELOPER */}
      <AddDeveloperModal isOpen={isModalAddOpen} onClose={() => setIsModalAddOpen(false)} onDeveloperAdded={fetchDevelopers} />

      {/* TAMPILKAN MODAL EDIT DEVELOPER */}
      <EditDeveloperModal isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} developer={selectedDeveloper} onDeveloperUpdated={fetchDevelopers} />
    </div>
  );
};

export default DeveloperPage;
