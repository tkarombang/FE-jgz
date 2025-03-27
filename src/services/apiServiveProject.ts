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
};
