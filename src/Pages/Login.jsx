import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../Contexts/AuthContext';
import { Helmet } from 'react-helmet-async';

const Login = () => {
    const { login, loginWithGoogle } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    // console.log(location);
    const [error, setError] = useState("");
    const [email, setEmail] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        // console.log({ email, password });

        //rest
        setError('')

        login(email, password)
            .then((res) => {
                const user = res.user
                console.log(user)
                toast.success('Login  successfully!')
                navigate(`${location.state ? location.state : '/'}`)
            })
            .catch((error) => {
                console.log(error);
                toast.error('Email or password is incorrect ! ')
            })
    }

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle()
            toast.success('Login with Google successfully!')
            navigate(`${location.state ? location.state : '/'}`)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Helmet>
                <title>Hotel Silk City | Login</title>
            </Helmet>
            <div className='font-web flex justify-center items-center min-h-screen font-three md:mx-auto mx-3 '>
                <div className='md:mx-auto card  max-w-sm bg-base-100 w-full  shrink-0 shadow-[0px_0px_20px_0px_rgba(211,117,44,0.3),0px_0px_40px_0px_rgba(156,39,176,0.1)]'>
                    <div className='card-body'>
                        <h1 className='text-3xl text-orange-500 font-bold text-center mb-2'>
                            Login your Account!
                        </h1>
                        <form onSubmit={handleLogin} className='fieldset'>
                            <label className='label'>Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name='email'
                                type='email'
                                className='input w-full'
                                placeholder='Enter Your Email'
                                required
                            />
                            <label className='label'>Password</label>
                            <div className='relative '>
                                <input
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    className='input w-full'
                                    placeholder='Password'
                                    required
                                />
                                <div className='absolute right-3 top-0 -translate-y-1/2 cursor-pointer text-gray-500'>
                                    <span
                                        className='absolute right-3 top-2.5 cursor-pointer text-gray-500'
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <FaEye size={25} />
                                        ) : (
                                            <FaEyeSlash size={25} />
                                        )}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <Link to='/forget-password' className='link link-hover'>
                                    Forgot password?
                                </Link>
                            </div>

                            {error && <p className='text-red-500 text-xs'>{toast.error(error)}</p>}

                            <button
                                type='submit'
                                className='btn text-white font-bold mt-4 bg-orange-500'
                            >
                                Login
                            </button>

                            {/* google login */}
                            <div
                                onClick={handleGoogleLogin}
                                className='btn bg-white text-black border-[#e5e5e5] my-2'
                            >
                                <svg
                                    aria-label='Google logo'
                                    width='16'
                                    height='16'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 512 512'
                                >
                                    <g>
                                        <path d='m0 0H512V512H0' fill='#fff'></path>
                                        <path
                                            fill='#34a853'
                                            d='M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341'
                                        ></path>
                                        <path
                                            fill='#4285f4'
                                            d='m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57'
                                        ></path>
                                        <path
                                            fill='#fbbc02'
                                            d='m90 341a208 200 0 010-171l63 49q-12 37 0 73'
                                        ></path>
                                        <path
                                            fill='#ea4335'
                                            d='m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55'
                                        ></path>
                                    </g>
                                </svg>
                                Login with Google
                            </div>

                            <p>
                                Don't have an account?
                                <Link to='/register' className='text-blue-500 ml-1'>
                                    Register
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Login;