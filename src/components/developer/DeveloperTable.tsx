import React, { useState } from "react";
import { Developer } from "../../services/apiServiceDev";
import AlertDelete from "../ui/DeleteConfirm";

interface DeveloperTableProps {
  developers: Developer[];
  onEdit: (developer: Developer) => void;
  onDelete: (developerId: number) => void;
}

const DeveloperTable: React.FC<DeveloperTableProps> = ({ developers, onEdit, onDelete }: DeveloperTableProps) => {
  const [isAlertDeleteOpen, setIsAlertDeleteOpen] = useState(false);
  const [devIdToDel, setDevIdToDel] = useState<number | null>(null);

  const openAlertDel = (developerId: number) => {
    setDevIdToDel(developerId);
    setIsAlertDeleteOpen(true);
  };
  const closeAlertDel = () => {
    setDevIdToDel(null);
    setIsAlertDeleteOpen(false);
  };

  const handleConfirmDelete = () => {
    if (devIdToDel !== null) {
      console.log("Developer  ID: ", devIdToDel);
      onDelete(devIdToDel);
      closeAlertDel();
    }
  };

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
              <tr key={dev.developerId} className="text-zinc-700">
                <td className="border p-2">{dev.developerId}</td>
                <td className="border p-2">{dev.nama}</td>
                <td className="border p-2">{dev.email}</td>
                <td className="border p-2">{dev.role}</td>
                <td className="border p-2">{dev.tanggalLahir ? new Date(dev.tanggalLahir).toLocaleDateString() : "Tanggal tidak tersedia"}</td>

                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex justify-around">
                    <button className="px-2 py-1 bg-emerald-500 hover:bg-emerald-700 text-white rounded" onClick={() => onEdit(dev)}>
                      Edit
                    </button>

                    <button className="px-2 py-1 bg-rose-400 text-white rounded hover:bg-red-700" onClick={() => openAlertDel(dev.developerId)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="border p-4 text-center text-gray-500">
                Tidak ada data developer
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <AlertDelete isOpenDel={isAlertDeleteOpen} onCloseDel={closeAlertDel} developerId={devIdToDel} onConfirm={handleConfirmDelete} />
    </div>
  );
};

export default DeveloperTable;
