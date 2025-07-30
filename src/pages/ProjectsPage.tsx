import React, { useEffect, useState } from "react";
import { ApiServiceProject, Project } from "../services/apiServiceProject";
import ProjectTable from "../components/projects/ProjectTable";
import AddProjectModal from "../components/projects/AddProjectModal";
import AlertDelete from "../components/ui/AlertDelete";
import EditProjectModal from "./EditProjectModal";

const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalAddProjOpen, setModalAddProjOpen] = useState(false);
  const [projIdToDel, setProjIdToDel] = useState<number | null>(null);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const fetchAllProjects = async () => {
    try {
      const dataProject = await ApiServiceProject.getAllProjects();
      setProjects(dataProject);
      setLoading(false);
    } catch (err) {
      console.error("GAGAL MENGAMBIL");
      setLoading(false);
    }
  };

  const handleProjectEdit = (project: Project) => {
    setSelectedProject(project);
    setModalEditOpen(true);
  };

  const handleOpenAlertDelete = (id: number) => {
    setProjIdToDel(id);
    setIsModalDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (projIdToDel !== null) {
      await ApiServiceProject.deleteProject(projIdToDel)
        .then(() => {
          console.log("PROJECT BERHASIL DIHAPUS, ID:", projIdToDel);
          setProjects((prev) => prev.filter((proj) => proj.projectId !== projIdToDel));
          setIsModalDeleteOpen(false);
          setProjIdToDel(null);
        })
        .catch((err) => {
          console.error("DELETE FAILED", err);
          fetchAllProjects();
          setIsModalDeleteOpen(false);
        });
    }
  };

  const closeAlertDel = () => {
    setIsModalDeleteOpen(false);
    setProjIdToDel(null);
  };

  return (
    <div className="flex flex-col container mx-auto p-6">
      <h1 className="text-3xl text-zinc-600 font-bold mb-4">Daftar Projects</h1>

      <button className="flex flex-row justify-center mb-4 px-4 py-2 bg-emerald-400 hover:bg-emerald-600 text-white rounded" onClick={() => setModalAddProjOpen(true)}>
        + Tambah Project
      </button>

      {loading ? <p>Loading...!</p> : <ProjectTable projects={projects} onDelete={handleOpenAlertDelete} onEdit={handleProjectEdit} />}

      <AddProjectModal isOpen={modalAddProjOpen} onClose={() => setModalAddProjOpen(false)} onProjectAdded={fetchAllProjects}></AddProjectModal>

      <EditProjectModal isOpen={modalEditOpen} onClose={() => setModalEditOpen(false)} project={selectedProject} onProjectUpdated={fetchAllProjects} />

      <AlertDelete key={`delete-modal-${projIdToDel}`} isOpenDel={isModalDeleteOpen} onCloseDel={closeAlertDel} onConfirm={confirmDelete} />
    </div>
  );
};

export default ProjectPage;
