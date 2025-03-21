// import React, { useActionState, useEffect, useState } from 'react'
// import { Label } from '@radix-ui/react-dropdown-menu'
// import { Input } from './ui/input'
// import { Button } from './ui/button'
// import { Link, Navigate, useNavigate } from 'react-router-dom'
// import { login } from '../actions/userActions'
// const Login = () => {
//     const navigate=useNavigate();
//     const [formData,setFormData]=useState({email:"",password:""})
//     const [state,formAction,isPending]=useActionState(login,{success:null,error:null,})

//     useEffect(()=>{
//   if(state.success){
//     setTimeout(()=>{
//         navigate("/login")
//     },20000);
//   }
//     },[state.success])

//     const handleChange =(event)=>{
//         setFormData({...formData,[event.target.name]:event.target.value})
//     }
//     console.log(formData)
//     return (
//     <div className='h-screen flex justify-center items-center transform -translate-y-16'>
//         <form action={formAction} className='flex flex-col gap-6 max-w-xl w-full px-8'>
//            <div className='flex flex-col gap-2'>
//            <Label>Email</Label>
//            <Input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange}></Input>
//            </div>
//            <div className='flex flex-col gap-2'>
//            <Label>Password</Label>
//            <Input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange}></Input>
//            </div>
//             {
//             state.error &&(
//                 <span className='message'>
//                     {state.error}
//                 </span>
//             )
//            }
//            <Button disabled={isPending}>
//             {
//                 isPending?"Logging in":"Log In"
//             }
//            </Button>
//            <span className='text-[#63657b] text-center'>Don't have an account ? 
//             <Link to="/register" className='transition ease-in-out hover:cursor-pointer hover:text-primary hover:underline'> Register</Link>
//            </span>
//         </form>
//     </div>
//   )
// }

// export default Login;


import React, { useEffect, useState } from 'react';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../actions/userActions';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [state, setState] = useState({ success: null, error: null });
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        navigate('/todos'); // or any page after successful login
      }, 2000);
    }
  }, [state.success, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    const form = new FormData();
    form.append('email', formData.email);
    form.append('password', formData.password);
    const result = await login({}, form);
    setState(result);
    setIsPending(false);
  };

  return (
    <div className="h-screen flex justify-center items-center transform -translate-y-16">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-xl w-full px-8">
        <div className="flex flex-col gap-2">
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {state.error && <span className="text-red-500 text-sm">{state.error}</span>}
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Logging in...' : 'Log In'}
        </Button>
        <span className="text-[#63657b] text-center">
          Don't have an account?
          <Link
            to="/register"
            className="transition ease-in-out hover:cursor-pointer hover:text-primary hover:underline"
          >
            {' '}Register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
