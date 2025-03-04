import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000", 
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const handleApiError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || "API error occurred.";
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return "An unknown error occurred.";
    }
  };

export const submitData = async (data:{}) => {
    try {
        const res = await axiosInstance.post("/",data);
        return res.data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

export const fetchDfetchDatafromBackata = async ()=>{
  try {
    console.log("hiiii in fetch daya")
    const  response = await axiosInstance.get("/getData");
    return response.data
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}
