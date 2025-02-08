import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
import { adminLogin } from "../endpoints/AdminEndpoints";
import { doctorLogin } from "../endpoints/DoctorEndpoints";


const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler=async(event)=>{

    event.preventDefault()

    try {
        
        if(state==="Admin"){
            const {data}=await adminLogin(email,password)
            if(data.success){
              
              localStorage.setItem("aToken",data.token)
              setAToken(data.token)
              
            }else{
              toast.error(data.message)
            }
          }
          else{
          const {data}=await doctorLogin(email,password)
          if(data.success){
              
            localStorage.setItem("dToken",data.token)
            setDToken(data.token)            
            
          }else{
            toast.error(data.message)
          }
        }
        
      } catch (error) {
      toast.error(error.message)
        
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login{" "}
            <span
              className="cursor-pointer underline text-primary"
              onClick={() => setState("Doctor")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login{" "}
            <span
              className="cursor-pointer underline text-primary"
              onClick={() => setState("Admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
