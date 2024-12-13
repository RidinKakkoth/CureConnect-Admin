import { useState } from "react";
import { assets, specialityData } from "../../assets/assets.js";
import {toast} from 'react-toastify'
import { addDoctor } from "../../endpoints/AdminEndpoints.js";
import SubmitSpinner from "../../components/Spinners.jsx";
const AddDoctor = () => {
  

  const[docImg,setDocImg]=useState(false)
  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[experience,setExperience]=useState("1 Year")
  const[fees,setFees]=useState("")
  const[about,setAbout]=useState("")
  const[speciality,setSpeciality]=useState("General physician")
  const[degree,setDegree]=useState("")
  const[address1,setAddress1]=useState("")
  const[address2,setAddress2]=useState("")

 const[loading,setLoading]=useState(false)


  const onSubmitHandler=async(e)=>{

    e.preventDefault()

    try {
      if(!docImg){
        return toast.error("Image Not Selected")
      }
      const formData=new FormData()
      formData.append('image',docImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experience',experience)
      formData.append('fees',Number(fees))
      formData.append('about',about)
      formData.append('speciality',speciality)
      formData.append('degree',degree)
      formData.append('address',JSON.stringify({line1:address1,line2:address2}))

      setLoading(true)
      //console log formData

      // formData.forEach((value,key)=>console.log(`${key}: ${value}`))

      const {data}= await addDoctor(formData)
      
      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setName("")
        setEmail("")
        setPassword("")
        setAddress1("")
        setAddress2("")
        setDegree("")
        setFees("")
        setAbout("")
        setLoading(false)
      }
      else{
        setLoading(false)
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh ] overflow-y-scroll ">
        <div className=" flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img src={docImg?URL.createObjectURL(docImg):assets.upload_area} alt="Upload doctor" className="w-16 bg-gray-100 rounded-full cursor-pointer" />
          </label>
          <input  onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p>
            Upload doctor <br />
            picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex flex-1 flex-col gap-1">
              <p>Doctor Name</p>
              <input value={name} onChange={(e)=>setName(e.target.value)} className="border rounded px-3 py-2" type="text" placeholder="Name" required />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <p>Doctor Email</p>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} className="border rounded px-3 py-2"  type="text" placeholder="Email" required />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <p>Doctor Password</p>
              <input value={password} onChange={(e)=>setPassword(e.target.value)} className="border rounded px-3 py-2" type="password" placeholder="Password" required />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <p>Experience</p>

              <select value={experience} onChange={(e)=>setExperience(e.target.value)} className="border rounded px-3 py-2">
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={`${i + 1} Year`}>
                    {i + 1} Year
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <p>Fees</p>
              <input value={fees} onChange={(e)=>setFees(e.target.value)} className="border rounded px-3 py-2" type="number" placeholder="fees" required />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex flex-1 flex-col gap-1">
              <p>Speciality</p>
              <select value={speciality} onChange={(e)=>setSpeciality(e.target.value)} className="border rounded px-3 py-2" name="" id="">
                {specialityData.map((item, index) => (
                  <option key={index} value={`${item.speciality}`}>
                    {" "}
                    {item.speciality}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <p>Education</p>
              <input value={degree} onChange={(e)=>setDegree(e.target.value)} className="border rounded px-3 py-2" type="text" placeholder="Education" required />
            </div>
            <div className=" flex flex-1 flex-col gap-1">
              <p>Address</p>
              <input value={address1} onChange={(e)=>setAddress1(e.target.value)} className="border rounded px-3 py-2" type="text" placeholder="address 1" required />
              <input value={address2} onChange={(e)=>setAddress2(e.target.value)} className="border rounded px-3 py-2" type="text" placeholder="address 2" required />
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className="w-full px-4 pt-2 border rounded" placeholder="write about doctor" rows={5} required />
        </div>

        <button type="submit" disabled={loading} className={`${loading?"bg-[#7b87f9]":"bg-primary"} flex gap-2 px-10 py-3 mt-4 rounded-full text-white`}> <span>{loading?<SubmitSpinner loading={loading} />:"" }</span> Add doctor</button>
      </div>
    </form>
  );
};

export default AddDoctor;
