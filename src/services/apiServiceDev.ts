import axios from "axios";

const API_URL = "http://localhost:5020/api/Developers";

export interface Developer {
  developerId: number;
  nama: string;
  email: string;
  role: string;
  phone?: string | null;
  tanggalLahir?: string | null;
  status?: string | null;
  gender?: number | null;
}

interface ApiResponse {
  $id: string;
  $values: Developer[];
}

export const ApiServiceDev = {
  getDevelopers: async (): Promise<Developer[]> => {
    try {
      const response = await axios.get<ApiResponse>(API_URL);
      return response.data.$values;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },

  createDeveloper: async (developer: Omit<Developer, "developerId">) => {
    try {
      await axios.post(`${API_URL}`, developer);
      console.log("DEVELOPER BARU BERHASIL DIBUAT");
    } catch (err) {
      console.error("GAGAL MENAMBAHKAN DEVELOPER", err);
    }
  },

  deleteDeveloper: async (developerId: number) => {
    try {
      await axios.delete(`${API_URL}/${developerId}`);
      console.log("DEVELOPER BERHASIL DI HAPUS");
    } catch (err) {
      console.error("GAGAL MENGHAPUS DEVELOPER", err);
      throw new Error("Failed to Delete Develoepr");
    }
  },

  updateDeveloper: async (developer: Developer) => {
    try {
      await axios.put(`${API_URL}/${developer.developerId}`, developer, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("DEVELOPER UPDATE SUCCESSFULL");
    } catch (error) {
      console.error("ERROR UPDATING DEVELOPER:", error);
      throw new Error("Failed to update Developer");
    }
  },
};
