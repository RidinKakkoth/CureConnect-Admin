import {  doctorAxiosInstance } from '../config/axios';

export const doctorLogin=async(email,password)=>{
    try {
        const response=await doctorAxiosInstance.post('/api/doctor/login',{email,password})
       return response
        
    } catch (error) {            
        throw new Error(error.response?.data?.message );
    }
}

export const getDoctorAppointments=async()=>{
    try {
        
        const response=await doctorAxiosInstance.get('/api/doctor/appointments')            
        return response
        
    } catch (error) {            
        throw new Error(error.response?.data?.message || 'Failed to fetch doctor list');
    }
}
export const finishAppointment=async(appointmentId)=>{
    try {
        const response=await doctorAxiosInstance.post('/api/doctor/complete-appointment',{appointmentId})
       return response
        
    } catch (error) {            
        throw new Error(error.response?.data?.message );
    }
}
export const toCancelAppointment=async(appointmentId)=>{
    try {
        const response=await doctorAxiosInstance.post('/api/doctor/cancel-appointment',{appointmentId})
       return response
        
    } catch (error) {            
        throw new Error(error.response?.data?.message );
    }
}
export const getDoctorDashData=async()=>{
    try {
        
        const response=await doctorAxiosInstance.get('/api/doctor/dashboard')   
        
                 
        return response
        
    } catch (error) {            
        throw new Error(error.response?.data?.message || 'Failed to fetch doctor dashboard');
    }
}
export const doctorProfileData=async()=>{
    try {
        
        const response=await doctorAxiosInstance.get('/api/doctor/profile')   
        
                 
        return response
        
    } catch (error) {            
        throw new Error(error.response?.data?.message || 'Failed to fetch doctor profile');
    }
}
export const toUpdateProfileData=async(updateData)=>{
    try {
        
        const response=await doctorAxiosInstance.post('/api/doctor/update-profile',updateData)   
        
                 
        return response
        
    } catch (error) {            
        throw new Error(error.response?.data?.message || 'Failed to update doctor profile');
    }
}