import React, { useEffect, useState } from "react";
import { ApiServiceProject, Project } from "../services/apiServiveProject";

const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const fetchAllProjects = async () => {
    try {
      const dataProject = await ApiServiceProject.getAllProjects();
      setProjects(dataProject);
    } catch (err) {
      console.error("GAGAL MENGAMBIL");
    }
  };

  return (
    <div className="flex flex-col container mx-auto p-6">
      <h1 className="text-3xl text-zinc-600 font-bold mb-4">Daftar Projects</h1>

      <button className="flex flex-row justify-center mb-4 px-4 py-2 bg-emerald-400 hover:bg-emerald-600 text-white rounded">+ Tambah Project</button>

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
                <tr className="text-zinc-700">
                  <td className="border p-2">{proj.projectId}</td>
                  <td className="border p-2">{proj.nama}</td>
                  <td className="border p-2">{proj.description}</td>
                  <td className="border p-2">{proj.start_Date ? new Date(proj.start_Date).toLocaleDateString() : "Empty Date"}</td>
                  <td className="border p-2">{proj.end_Date ? new Date(proj.end_Date).toLocaleDateString() : "Empty Date"}</td>
                  <td className="border p-2">{proj.status}</td>

                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex justify-around">
                      <button className="flex flex-row justify-around px-2 py-1 w-20 bg-emerald-500 hover:bg-emerald-700 text-white rounded">Edit</button>

                      <button className="flex flex-row justify-around px-2 py-1 bg-rose-400 text-white w-20 rounded hover:bg-red-700">Delete</button>
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
    </div>
  );
};

export default ProjectPage;
