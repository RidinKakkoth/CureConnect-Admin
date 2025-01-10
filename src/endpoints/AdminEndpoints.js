import axiosInstance from "../config/axios"


export const addDoctor=async(formData)=>{
        try {
            const response=await axiosInstance.post('/api/admin/add-doctor',formData)
           return response
            
        } catch (error) {            
            throw new Error(error.response?.data?.message );
        }
}
export const allDoctors=async()=>{
        try {
            
            const response=await axiosInstance.get('/api/admin/all-doctors')            
           return response
            
        } catch (error) {            
            throw new Error(error.response?.data?.message || 'Failed to fetch doctor list');
        }
}
export const changeDoctorAvailability=async(docId)=>{
        try {
            
            const response=await axiosInstance.put('/api/admin/change-availability',{docId})            
           return response
            
        } catch (error) {            
            throw new Error(error.response?.data?.message || 'Failed to change');
        }
}