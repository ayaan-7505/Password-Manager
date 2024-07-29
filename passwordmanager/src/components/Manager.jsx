import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ website: "", username: "", password: "" })
    const [passwordarray, setpasswordarray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpasswordarray(JSON.parse(passwords))
        }
    }, [])


    const showpassword = () => {
        passwordref.current.type = 'text'
        if (ref.current.src.includes("https://cdn.lordicon.com/fmjvulyw.json")) {
            passwordref.current.type = 'password'
            ref.current.src = "https://cdn.lordicon.com/kkiecexg.json"
        }
        else {
            passwordref.current.type = 'text'
            ref.current.src = "https://cdn.lordicon.com/fmjvulyw.json"
        }
    }

    const savePassword = () => {
        if(form.website.length>3 && form.username.length>3 && form.password.length>3){
            setpasswordarray([...passwordarray, {...form, id: uuidv4()}])
            localStorage.setItem("passwords", JSON.stringify([...passwordarray, {...form, id: uuidv4()}]))
            setform({ website: "", username: "", password: "" })
             toast('Password Saved!!');
        }
        else{
            toast('Password not saved!!');
        }
        
        
    }

    const deletePassword = (id) => {
        let c=confirm('Do you really want to delete this item?')
        if(c){
            setpasswordarray(passwordarray.filter(item=>item.id!==id))
            localStorage.setItem("passwords", JSON.stringify(passwordarray.filter(item=>item.id!==id)))
            toast('Password Deleted!!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
        
    }

    const editpassword = (id) => {
        setform(passwordarray.filter(item=>item.id===id)[0])
        setpasswordarray(passwordarray.filter(item=>item.id!==id))
        
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copytext = (text) => {
        toast('Copied to Clipboard!!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        navigator.clipboard.writeText(text)
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]">
                </div>
            </div>
            <div className="p-3 md:mycontainer min-h-[88.2vh]">
                <h1 className='text-center font-bold text-4xl'>
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your Own Password Manager</p>
                <div className='flex flex-col p-4 text-black gap-8'>
                    <input value={form.website} onChange={handleChange} placeholder='Enter website URL' className="rounded-full border border-green-500 w-full p-4 py-1" type="text" name="website" id="website" />
                    <div className="flex flex-col md:flex-row gap-8 w-full">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='border border-green-500 rounded-full w-full p-4 py-1' type="text" name="username" id="username" />
                        <div className="relative">
                            <input ref={passwordref} value={form.password} onChange={handleChange} placeholder='Enter Password' className='border border-green-500 rounded-full w-full p-4 py-1' type="password" name="password" id="password" />
                            <span className='absolute right-1 cursor-pointer' onClick={showpassword}>
                                <lord-icon ref={ref}
                                    src="https://cdn.lordicon.com/kkiecexg.json"
                                    trigger="hover"
                                >
                                </lord-icon>
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-300 rounded-full w-fit border border-green-800 p-4 py-2 hover:bg-green-500 mx-auto gap-2'>
                        <lord-icon
                            src="https://cdn.lordicon.com/ftndcppj.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save Password
                    </button>
                </div>
                <div className='passwords'>
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordarray.length === 0 && <div>No passwords to show</div>}
                    {passwordarray.length != 0 && <table className="table-auto w-full rounded-lg overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                                
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordarray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='border border-white py-2'>
                                        <div className='flex items-center justify-center'>
                                            <a href={item.website} target='_blank'>{item.website}</a>
                                            <div className='h-5 w-5 cursor-pointer ' onClick={() => { copytext(item.website) }}>
                                                <img src="/src/copy.png" alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='border border-white py-2'>
                                        <div className='flex items-center justify-center'>
                                            <div>{item.username}</div>
                                            <div className='h-5 w-5 cursor-pointer' onClick={() => { copytext(item.username) }}>
                                                <img src="/src/copy.png" alt="" />
                                            </div>
                                        </div>
                                    </td >
                                    <td className='border border-white py-2'>
                                        <div className='flex items-center justify-center' onClick={() => { copytext(item.password) }}>
                                            <div>{item.password}</div>
                                            <div className='h-5 w-5 cursor-pointer'>
                                                <img src="/src/copy.png" alt="" />
                                            </div>
                                        </div>
                                    </td >
                                    <td className='text-center border border-white py-2'>
                                        <div className='flex justify-center items-center gap-5'>
                                        <span className='cursor-pointer' onClick={()=>{deletePassword(item.id)}}>
                                            <img className='w-5 h-5' src="/src/delete.png" alt="" />
                                        </span>
                                        <span className='cursor-pointer' onClick={()=>{editpassword(item.id)}}>
                                            <img className='h-5 w-5' src="/src/edit.png" alt="" />
                                        </span>
                                        </div>
                                    </td >
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>


    )
}

export default Manager
