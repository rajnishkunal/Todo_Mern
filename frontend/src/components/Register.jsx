// // import React, { useActionState, useEffect, useState } from 'react'
// // import { Label } from '@radix-ui/react-dropdown-menu'
// // import { Input } from './ui/input'
// // import { Button } from './ui/button'
// // import { Link, Navigate, useNavigate } from 'react-router-dom'
// // import { register } from '../actions/userActions'
// // const Register = () => {
// //     const navigate=useNavigate();
// //     const [formData,setFormData]=useState({email:"",password:""})
// //     const [state,formAction,isPending]=useActionState(register,{success:null,error:null,})

// //     useEffect(()=>{
// //   if(state.success){
// //     setTimeout(()=>{
// //         navigate("/login")
// //     },20000);
// //   }
// //     },[state.success])

// //     const handleChange =(event)=>{
// //         setFormData({...formData,[event.target.name]:event.target.value})
// //     }
// //     console.log(formData)
// //     return (
// //     <div className='h-screen flex justify-center items-center transform -translate-y-16'>
// //         <form action={formAction} className='flex flex-col gap-6 max-w-xl w-full px-8'>
// //            <div className='flex flex-col gap-2'>
// //            <Label>Email</Label>
// //            <Input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange}></Input>
// //            </div>
// //            <div className='flex flex-col gap-2'>
// //            <Label>Password</Label>
// //            <Input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange}></Input>
// //            </div>
// //            {
// //             state.success &&(
// //                 <span className='message successMsg'>
// //                     {state.success} {"Redirecting..."}
// //                 </span>
// //             )
// //            }
// //             {
// //             state.error &&(
// //                 <span className='message'>
// //                     {state.error}
// //                 </span>
// //             )
// //            }
// //            <Button disabled={isPending}>
// //             {
// //                 isPending?"Registering":"Register"
// //             }
// //            </Button>
// //            <span className='text-[#63657b] text-center'>Already have an account ? 
// //             <Link to="/login" className='transition ease-in-out hover:cursor-pointer hover:text-primary hover:underline'> Login</Link>
// //            </span>
// //         </form>
// //     </div>
// //   )
// // }

// // export default Register


// import React, { useEffect, useState } from 'react';
// import { Label } from '@radix-ui/react-dropdown-menu';
// import { Input } from './ui/input';
// import { Button } from './ui/button';
// import { Link, useNavigate } from 'react-router-dom';
// import { register } from '../actions/userActions';

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [state, setState] = useState({ success: null, error: null });
//   const [isPending, setIsPending] = useState(false);

//   useEffect(() => {
//     if (state.success) {
//       setTimeout(() => {
//         navigate('/login');
//       }, 2000);
//     }
//   }, [state.success, navigate]);

//   const handleChange = (event) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsPending(true);
//     const form = new FormData();
//     form.append('email', formData.email);
//     form.append('password', formData.password);
//     const result = await register({}, form);
//     setState(result);
//     setIsPending(false);
//   };

//   return (
//     <div className='h-screen flex justify-center items-center transform -translate-y-16'>
//       <form onSubmit={handleSubmit} className='flex flex-col gap-6 max-w-xl w-full px-8'>
//         <div className='flex flex-col gap-2'>
//           <Label>Email</Label>
//           <Input
//             type='email'
//             name='email'
//             placeholder='Enter Email'
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className='flex flex-col gap-2'>
//           <Label>Password</Label>
//           <Input
//             type='password'
//             name='password'
//             placeholder='Enter Password'
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         {state.success && (
//           <span className='text-green-600 text-sm'>
//             {state.success} Redirecting...
//           </span>
//         )}
//         {state.error && (
//           <span className='text-red-500 text-sm'>{state.error}</span>
//         )}
//         <Button type='submit' disabled={isPending}>
//           {isPending ? 'Registering...' : 'Register'}
//         </Button>
//         <span className='text-[#63657b] text-center'>
//           Already have an account?{' '}
//           <Link
//             to='/login'
//             className='transition ease-in-out hover:cursor-pointer hover:text-primary hover:underline'
//           >
//             Login
//           </Link>
//         </span>
//       </form>
//     </div>
//   );
// };

// export default Register;


import React, { useEffect, useState } from 'react';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../actions/userActions';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [state, setState] = useState({ success: null, error: null });
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (state.success) {
      // Navigate immediately after success
      navigate('/login');
    }
  }, [state.success, navigate]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    const form = new FormData();
    form.append('email', formData.email);
    form.append('password', formData.password);
    const result = await register({}, form);
    setState(result);
    setIsPending(false);
  };

  return (
    <div className="h-screen flex justify-center items-center transform -translate-y-16">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 max-w-xl w-full px-8"
      >
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

        {state.success && (
          <span className="text-green-600 text-sm">
            {state.success} Redirecting...
          </span>
        )}
        {state.error && (
          <span className="text-red-500 text-sm">{state.error}</span>
        )}

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Registering...' : 'Register'}
        </Button>

        <span className="text-[#63657b] text-center">
          Already have an account?{' '}
          <Link
            to="/login"
            className="transition ease-in-out hover:cursor-pointer hover:text-primary hover:underline"
          >
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
