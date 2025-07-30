import React, { useEffect, useState } from "react";
import { ApiServiceDev, Developer } from "../services/apiServiceDev";
import DeveloperTable from "../components/developer/DeveloperTable";
import AddDeveloperModal from "../components/developer/AddDeveloperModal";
import EditDeveloperModal from "../components/developer/EditDeveloperModal";
import { motion, AnimatePresence } from "framer-motion";
import { UserRoundPlus } from "lucide-react";
import AlertDelete from "../components/ui/AlertDelete";

const DeveloperPage: React.FC = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [devIdToDel, setDevIdToDel] = useState<number | null>(null);
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
      setLoading(false);
    }
  };

  const handleDeveloperEdit = (developer: Developer) => {
    setSelectedDeveloper(developer);
    setIsModalEditOpen(true);
  };

  const handleOpenAlertDelete = (id: number) => {
    setDevIdToDel(id);
    setIsModalDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (devIdToDel !== null) {
      await ApiServiceDev.deleteDeveloper(devIdToDel)
        .then(() => {
          console.log("DEVELOPER BERHASIL DIHAPUS, ID:", devIdToDel);
          setDevelopers((prev) => prev.filter((dev) => dev.developerId !== devIdToDel));
          setIsModalDeleteOpen(false);
          setDevIdToDel(null);
        })
        .catch((err) => {
          console.error("DELETE FAILED", err);
          fetchDevelopers();
          setIsModalDeleteOpen(false);
        });
    }
  };

  const closeAlertDel = () => {
    setIsModalDeleteOpen(false);
    setDevIdToDel(null);
  };

  const dotVariants = {
    pulse: {
      scale: [1, 1.5, 1],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  function StyleSheet() {
    return (
      <style>
        {`
          .container {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 20px;
          }

          .dot {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background-color: #34d399;
              will-change: transform;
          }
          `}
      </style>
    );
  }

  return (
    <div className="flex flex-col container mx-auto p-6">
      <h1 className="text-3xl text-zinc-600 font-bold mb-4">Daftar Developers</h1>

      <motion.button className="flex flex-row justify-center mb-4 px-4 py-2 bg-emerald-400 hover:bg-emerald-600 text-white rounded" onClick={() => setIsModalAddOpen(true)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }}>
        <UserRoundPlus className="mr-2" /> Tambah Developer
      </motion.button>

      {/* TAMPILKAN TABEL DEVELOPERS JIKA TIDAK ADA MAKA ANIMASI dot*/}
      {loading ? (
        <motion.div animate="pulse" transition={{ staggerChildren: -0.2, staggerDirection: -1 }} className="container">
          <motion.div className="dot" variants={dotVariants} />
          <motion.div className="dot" variants={dotVariants} />
          <motion.div className="dot" variants={dotVariants} />
          <StyleSheet />
        </motion.div>
      ) : (
        <DeveloperTable developers={developers} onEdit={handleDeveloperEdit} onDelete={handleOpenAlertDelete} />
      )}

      {/* TAMPILKAN MODAL ADD DEVELOPER */}
      <AnimatePresence initial={false}>{isModalAddOpen && <AddDeveloperModal isOpen={isModalAddOpen} onClose={() => setIsModalAddOpen(false)} onDeveloperAdded={fetchDevelopers} />}</AnimatePresence>

      {/* TAMPILKAN MODAL EDIT DEVELOPER */}
      <AnimatePresence initial={false}>{isModalEditOpen && <EditDeveloperModal isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} developer={selectedDeveloper} onDeveloperUpdated={fetchDevelopers} />}</AnimatePresence>

      {/* TAMPILKAN MODAL DEVELOPER DELETE */}
      <AnimatePresence>{isModalDeleteOpen && <AlertDelete key={`delete-modal-${devIdToDel}`} isOpenDel={isModalDeleteOpen} onCloseDel={closeAlertDel} onConfirm={confirmDelete} />}</AnimatePresence>
    </div>
  );
};

export default DeveloperPage;
