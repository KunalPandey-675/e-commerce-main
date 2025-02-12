// import React, { useState } from 'react';
// import './Login.css';

// const Login = () => {
//   const [isRightPanelActive, setIsRightPanelActive] = useState(false);

//   const handleSignUpClick = () => setIsRightPanelActive(true);
//   const handleSignInClick = () => setIsRightPanelActive(false);

//   return (
//     <div className="login-container">
      
//       <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
//         <div className="form-container sign-up-container">
            
        
//           <form action="#">
//             <h1>Create Account</h1>
//             <div className="social-container">
//               <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
//               <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
//               <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
//             </div>
//             <span>or use your email for registration</span>
//             <input type="text" placeholder="Name" />
//             <input type="email" placeholder="Email" />
//             <input type="password" placeholder="Password" />
//             <button>Sign Up</button>
            
//           </form>
//         </div>

//         <div className="form-container sign-in-container">
//           <form action="#">
//             <h1>Sign in</h1>
//             <div className="social-container">
//               <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
//               <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
//               <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
//             </div>
//             <span>or use your account</span>
//             <input type="email" placeholder="Email" />
//             <input type="password" placeholder="Password" />
//             <a href="#">Forgot your password?</a>
//             <button>Sign In</button>
//           </form>
//         </div>

//         <div className="overlay-container">
//           <div className="overlay">
//             <div className="overlay-panel overlay-left">
//               <h1>Welcome Back!</h1>
//               <p>To access your orders and wishlist, please login</p>
//               <button className="ghost" onClick={handleSignInClick}>Sign In</button>
//             </div>
//             <div className="overlay-panel overlay-right">
//               <h1>Hello, Shopper!</h1>
//               <p>Create an account to start your shopping journey</p>
//               <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <footer>
//         <p>
//           Ecommerce Platform © {new Date().getFullYear()}
//           <br />
//           Secur Shopping Guaranteed
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default Login;

import { Link } from 'react-router-dom'

import myContext from '../../context/data/myContext';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Loader from '../../components/loader/Loader';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const context = useContext(myContext)
    const { loading,setLoading} = context

    const signin = async () => {
      setLoading(true);
      try {
        const result = await signInWithEmailAndPassword(auth, email, password)
        localStorage.setItem('user',JSON.stringify(result));
        toast.success('Signin Successfully', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        window.location.href='/'
        setLoading(false);
      } catch (error) {
        toast.error('Sigin Failed', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false);
      }
    }
   
    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader/>}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                </div>
                <div>
                    <input type="email"
                        name='email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                    onClick={signin}
                        className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                        Login
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Don't have an account <Link className=' text-yellow-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Login