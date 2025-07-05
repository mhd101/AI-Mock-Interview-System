import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useForm } from 'react-hook-form'

const Login = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode: "onChange"
  });

  return (
    <>
      <Navbar text="Register" buttonMessage="Don't have an account?" onclick={() => navigate("/register")}  />
      <div className="flex flex-col items-center justify-center gap-5 max-w-[1024px] h-screen mx-auto mt-[-96px] text-center">

        <div className="flex flex-col justify-center item-center mt-30"> 
          <h2 className="text-5xl">Welcome Back</h2>
          <p className="text-3xl font-extralight">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit((data) => {
          console.log(data);
        })} className="w-sm flex flex-col gap-2">

          {/* Email */}
          <div className="flex flex-col items-start w-full gap-0.5">
            <label htmlFor="Email">Email</label>
            <input {...register("email", {

              required: " Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address"
              }

            })
            }
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md outline-gray-400 outline-1 w-full font-light text-sm" />
            <p className="text-red-600 text-sm mt-1">{errors.email?.message}</p>
          </div>


          {/* Password */}
          <div className="flex flex-col items-start w-full gap-0.5">
            <label htmlFor="Password">Password</label>
            <input type="password" {...register("password", {

              required: "Password is required",

            })
            }
              placeholder="Enter your password"
              className="px-4 py-2 rounded-md outline-gray-400 outline-1 w-full font-light text-sm" />
            <p className="text-red-600 text-sm mt-1">{errors.password?.message}</p>
          </div>

          <button type="submit" className="bg-black text-white px-10 py-3 w-full rounded-md mt-2 outline-black cursor-pointer hover:bg-neutral-800">Login</button>
        </form>
      </div>
    </>
  )
}

export default Login
