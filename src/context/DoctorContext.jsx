import { useState } from "react";
import { createContext } from "react";
import {
  doctorProfileData,
  finishAppointment,
  getDoctorAppointments,
  getDoctorDashData,
  toCancelAppointment,
  toUpdateProfileData,
} from "../endpoints/DoctorEndpoints";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [appointments, setAppointments] = useState([]);
  const[dashData,setDashData]=useState([])
  const[profileData,setProfileData]=useState(false)

  const getAppointments = async () => {
    try {
      const { data } = await getDoctorAppointments();
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await finishAppointment(appointmentId);
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await toCancelAppointment(appointmentId);
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const getDashData=async()=>{
    try {
        const { data } = await getDoctorDashData();
        if (data.success) {          
          setDashData(data.dashData)
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error);
      }
  }
  const getProfileData=async()=>{
    try {
        const { data } = await doctorProfileData();
        if (data.success) {          
          setProfileData(data.profileData)
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error);
      }
  }



  const value = {
    dToken,
    setDToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    getDashData,
    dashData,
    setDashData,
    profileData,
    getProfileData,
    setProfileData
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
