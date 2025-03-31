import React from "react";
import { Project } from "../../services/apiServiceProject";

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (projectId: number) => void;
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects, onDelete, onEdit }: ProjectTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table id="projects" className="w-full border border-gray-300 shadow-lg">
        <thead className="bg-gray-200 text-zinc-600">
          <tr>
            <th className="border border-red-200 p-2">ID</th>
            <th className="border border-red-200 p-2">Nama</th>
            <th className="border border-red-200 p-2">Description</th>
            <th className="border border-red-200 p-2">Start Date</th>
            <th className="border border-red-200 p-2">End Date</th>
            <th className="border border-red-200 p-2">Status</th>
            <th className="border border-red-200 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map((proj) => (
              <tr key={proj.projectId} className="text-zinc-700">
                <td className="border p-2">{proj.projectId}</td>
                <td className="border p-2">{proj.nama}</td>
                <td className="border p-2">{proj.description}</td>
                <td className="border p-2">{proj.start_Date ? new Date(proj.start_Date).toLocaleDateString() : "Empty Date"}</td>
                <td className="border p-2">{proj.end_Date ? new Date(proj.end_Date).toLocaleDateString() : "Empty Date"}</td>
                <td className="border p-2">{proj.status}</td>

                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex justify-around">
                    <button className="flex flex-row justify-around px-2 py-1 w-20 bg-emerald-500 hover:bg-emerald-700 text-white rounded" onClick={() => onEdit(proj)}>
                      Edit
                    </button>

                    <button className="flex flex-row justify-around px-2 py-1 bg-rose-400 text-white w-20 rounded hover:bg-red-700" onClick={() => onDelete(proj.projectId)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="border p-4 text-center text-gray-500">
                <h1 className="text-slate-600 text-2xl">Tidak Ada Data Project</h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
