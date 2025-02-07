import { createContext, useState } from "react";
import {toast} from 'react-toastify'
import { allAppointments, allDoctors, cancelBooking, changeDoctorAvailability, getDashboardData } from "../endpoints/AdminEndpoints";

export const AdminContext=createContext()

const AdminContextProvider=(props)=>{

    const [aToken,setAToken]=useState(localStorage.getItem("aToken")?localStorage.getItem("aToken"):"")
    const [doctors,setDoctors]=useState([])
    const[appointenmts,setAppointments]=useState([])

    const[dashData,setDashData]=useState(false)

    const backendUrl=import.meta.env.VITE_BACKEND_URL

    const getAllDoctors=async ()=>{
        try {          
            const {data}=await allDoctors()
            if(data.success){
                setDoctors(data.doctors)
            }
            else{
                toast.error(data.message)
            }         
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailability= async(docId)=>{

        try {
            const {data}=await changeDoctorAvailability(docId)
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            }
            else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllAppointments=async()=>{
        try {
            const {data}=await allAppointments()
            if(data.success){
                setAppointments(data.appointments)
                
            }
            else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancelAppointment=async(appointmentId)=>{
        try {
            const {data}=await cancelBooking(appointmentId)
            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message) 
        }
    }

    const getDashData=async()=>{
        try {
            const {data}=await getDashboardData()
            
            if(data.success){
                setDashData(data.dashData)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message) 
        }
    }

    const value={
        aToken,
        setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
        getAllAppointments,
        appointenmts,
        setAppointments,
        cancelAppointment,
        getDashData,
        dashData
    }

    return (
    <AdminContext.Provider value={value}>
        {props.children}
    </AdminContext.Provider>
    )
}

export default AdminContextProvider