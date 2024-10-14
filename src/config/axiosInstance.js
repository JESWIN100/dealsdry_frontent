import axios from "axios";

export const axiosInstance= axios.create({
    baseURL: `http://localhost:3456/api/v1`,
}) 