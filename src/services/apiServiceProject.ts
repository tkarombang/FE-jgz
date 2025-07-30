import axios from "axios";

const API_URL = "http://localhost:5020/api/Project";

export interface Project {
  projectId: number;
  nama: string;
  description: string;
  start_Date: string | null;
  end_Date: string | null;
  status: string;
}

interface ApiResponse {
  $id: string;
  $values: Project[];
}

export const ApiServiceProject = {
  getAllProjects: async (): Promise<Project[]> => {
    try {
      const response = await axios.get<ApiResponse>(API_URL);
      return response.data.$values;
    } catch (err) {
      console.error("ERROR FETCHING PROJECTS", err);
      return [];
    }
  },

  createProject: async (project: Omit<Project, "projectId">) => {
    try {
      await axios.post(`${API_URL}`, project);
      console.log("PROJECT BARU BERHASIL DIBUAT");
    } catch (err) {
      console.error("GAGAL MENAMBAHKAN PROJECT", err);
    }
  },

  deleteProject: async (projectId: number) => {
    try {
      await axios.delete(`${API_URL}/${projectId}`);
      console.log("PROJECT BERHASIL DI HAPUS");
    } catch (err) {
      console.error("GAGAL MENGHAPUS DEVELOPER", err);
      throw new Error("Failled to Delete Project");
    }
  },

  updateProject: async (project: Project) => {
    try {
      await axios.put(`${API_URL}/${project.projectId}`, project, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("PROJECT UPDATE SUCCESSFULL");
    } catch (err) {
      console.error("ERROR UPDATING PROJECT:", err);
      throw new Error("Failled to update Project");
    }
  },
};
