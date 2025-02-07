// import axiosInstance from "../config/axios"
import { adminAxiosInstance } from '../config/axios';


export const adminLogin=async(email,password)=>{
        try {
            const response=await adminAxiosInstance.post('/api/admin/login',{email,password})
           return response
            
        } catch (error) {            
            throw new Error(error.response?.data?.message );
        }
}
export const addDoctor=async(formData)=>{
        try {
            const response=await adminAxiosInstance.post('/api/admin/add-doctor',formData)
           return response
            
        } catch (error) {            
            throw new Error(error.response?.data?.message );
        }
}
export const allDoctors=async()=>{
        try {
            
            const response=await adminAxiosInstance.get('/api/admin/all-doctors')            
           return response
            
        } catch (error) {            
            throw new Error(error.response?.data?.message || 'Failed to fetch doctor list');
        }
}
export const allAppointments=async()=>{
        try {
            
            const response=await adminAxiosInstance.get('/api/admin/appointments')            
           return response
            
        } catch (error) {            
            throw new Error(error.response?.data?.message || 'Failed to fetch doctor list');
        }
}
export const changeDoctorAvailability=async(docId)=>{
        try {
            
            const response=await adminAxiosInstance.put('/api/admin/change-availability',{docId})            
           return response
            
        } catch (error) {            
            throw new Error(error.response?.data?.message || 'Failed to change');
        }
}

export const cancelBooking=async(appointmentId)=>{
    try {
        
        const response=await adminAxiosInstance.post('/api/admin/cancel-appointment',{appointmentId})            
        return response
        
    } catch (error) {            
        throw new Error(error.response?.data?.message || 'Failed to login');
    }
}
export const getDashboardData=async()=>{
    try {
        
        const response=await adminAxiosInstance.get('/api/admin/dashboard')            
        return response
        
    } catch (error) {            
        throw new Error(error.response?.data?.message || 'Failed to fetch data');
    }
}