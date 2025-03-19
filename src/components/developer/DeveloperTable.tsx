import React from "react";
import { Developer } from "../../services/apiServiceDev";

interface DeveloperTableProps {
  developers: Developer[];
  onEdit: (developer: Developer) => void;
  onDelete: (developerId: number) => void;
}

const DeveloperTable: React.FC<DeveloperTableProps> = ({ developers, onEdit, onDelete }: DeveloperTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table id="developers" className="w-full border border-gray-300 shadow-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Nama</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {developers.length > 0 ? (
            developers.map((dev) => (
              <tr key={dev.developerId} className="text-center">
                <td className="border p-2">{dev.developerId}</td>
                <td className="border p-2">{dev.nama}</td>
                <td className="border p-2">{dev.email}</td>
                <td className="border p-2">{dev.role}</td>
                <td className="border p-2">{dev.tanggalLahir ? new Date(dev.tanggalLahir).toLocaleDateString() : "Tanggal tidak tersedia"}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex justify-around">
                    <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={() => onEdit(dev)}>
                      Edit
                    </button>{" "}
                    <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700" onClick={() => onDelete(dev.developerId)}>
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
    </div>
  );
};

export default DeveloperTable;
