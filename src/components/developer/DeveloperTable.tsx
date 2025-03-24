import React from "react";
import { Developer } from "../../services/apiServiceDev";
import { motion, stagger } from "framer-motion";
import { Trash, UserRoundPen } from "lucide-react";

interface DeveloperTableProps {
  developers: Developer[];
  onEdit: (developer: Developer) => void;
  onDelete: (developerId: number) => void;
}

const DeveloperTable: React.FC<DeveloperTableProps> = ({ developers, onEdit, onDelete }: DeveloperTableProps) => {
  const transition = [
    ["tr", { opacity: 1 }],
    ["td", { x: [-20, 0] }, { delay: stagger(0.2) }],
  ];

  return (
    <div className="overflow-x-auto">
      <table id="developers" className="w-full border border-gray-300 shadow-lg">
        <thead className="bg-gray-200 text-zinc-600">
          <tr>
            <th className="border border-red-200 p-2">ID</th>
            <th className="border border-red-200 p-2">Nama</th>
            <th className="border border-red-200 p-2">Email</th>
            <th className="border border-red-200 p-2">Role</th>
            <th className="border border-red-200 p-2">Date</th>
            <th className="border border-red-200 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {developers.length > 0 ? (
            developers.map((dev) => (
              <motion.tr key={dev.developerId} className="text-zinc-700" transition={transition}>
                <motion.td className="border p-2" animate={{ x: 10 }} transition={transition}>
                  {dev.developerId}
                </motion.td>

                <motion.td className="border p-2" animate={{ x: 10 }} transition={transition}>
                  {dev.nama}
                </motion.td>

                <motion.td className="border p-2" animate={{ x: 10 }} transition={transition}>
                  {dev.email}
                </motion.td>

                <motion.td className="border p-2" animate={{ x: 10 }} transition={transition}>
                  {dev.role}
                </motion.td>

                <motion.td className="border p-2" animate={{ x: 10 }} transition={transition}>
                  {dev.tanggalLahir ? new Date(dev.tanggalLahir).toLocaleDateString() : "Tanggal tidak tersedia"}
                </motion.td>

                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex justify-around">
                    <button className="flex flex-row justify-around px-2 py-1 w-20 bg-emerald-500 hover:bg-emerald-700 text-white rounded" onClick={() => onEdit(dev)}>
                      <UserRoundPen />
                      Edit
                    </button>

                    <button className="flex flex-row justify-around px-2 py-1 bg-rose-400 text-white w-20 rounded hover:bg-red-700" onClick={() => onDelete(dev.developerId)}>
                      <Trash />
                      Delete
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="border p-4 text-center text-gray-500">
                <h1 className="text-slate-600 text-2xl">Tidak Ada Data Developer</h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeveloperTable;
