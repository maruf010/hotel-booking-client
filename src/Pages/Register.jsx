import { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import registerAnimation from '../assets/lotify/registerlotify.json';
import Lottie from 'lottie-react';

const Register = () => {
    const { createUser, updateUser, setUser, loginWithGoogle } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const formData = new FormData(form)
        const { email, password, ...userProfile } = Object.fromEntries(formData.entries());

        console.log(userProfile);

        // pass validation
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long')
            return
        } else if (!/[A-Z]/.test(password)) {
            toast.error('Must contain at least one Uppercase letter')
            return
        } else if (!/[a-z]/.test(password)) {
            toast.error('Must contain at least one Lowercase letter')
            return
        }

        // createUser(userProfile)
        createUser(email, password)
            .then(res => {
                const user = res.user;
                console.log(user);

                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo })
                        toast.success('Register  successfully!')
                        navigate('/')
                    })
                    .catch((error) => {
                        console.log(error)

                        setUser(user)
                    })
            })
            .catch(error => {
                console.log(error);

            })
    };
    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle()
            toast.success('Register with Google successfully!')
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Helmet>
                <title >Hotel Silk City | Register</title>
            </Helmet>
            <div className='font-web min-h-screen justify-evenly flex items-center font-three md:mx-auto mx-3'>

                <div className='card bg-base-100 w-full max-w-sm shrink-0 shadow-[0px_0px_20px_0px_rgba(211,117,44,0.3),0px_0px_40px_0px_rgba(156,39,176,0.1)]'>
                    <div className='card-body'>
                        <h1 className='text-3xl font-bold text-center mb-2 text-orange-500'>
                            Register now!
                        </h1>
                        <form onSubmit={handleRegister} className='fieldset'>
                            <label className='label'>Name</label>
                            <input
                                name='name'
                                type='text'
                                className='input w-full'
                                placeholder='Enter Your Name'
                                required
                            />

                            <label className='label'>Photo URL</label>
                            <input
                                name='photo'
                                type='text'
                                className='input w-full'
                                placeholder='Photo URL'
                                required
                            />

                            <label className='label'>Email</label>
                            <input
                                name='email'
                                type='email'
                                className='input w-full'
                                placeholder='Enter Your Email'
                                required
                            />

                            <label className='label'>Password</label>
                            <div className='relative'>
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

                            <button type='submit' className='btn text-white bg-orange-500 mt-4'>
                                Register
                            </button>

                            {/* google register */}
                            <div
                                onClick={handleGoogleLogin}
                                className='my-3 btn bg-white text-black border-[#e5e5e5]'
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
                                Register with Google
                            </div>

                            <p className=''>
                                Already have account? Please{' '}
                                <Link to='/login' className='text-blue-500'>
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>

                <div className='w-[300px] h-[300px] md:w-[400px] md:h-[400px]'>
                    <Lottie animationData={registerAnimation} loop={true} />
                </div>
            </div>
        </>
    );
};

export default Register;