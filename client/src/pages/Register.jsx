import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useForm } from 'react-hook-form'

const Register = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode: "onChange"
  });

  const password = watch("password");
  
  return (
    <>
      <Navbar text="Login" accountExist="Already have an account?" onclick={() => navigate("/login")}  />
      <div className="flex flex-col items-center justify-center gap-5 max-w-[1024px] h-screen mx-auto mt-[-96px] text-center">

        <div className="flex flex-col justify-center item-center mt-30"> 
          <h2 className="text-5xl">Create account</h2>
          <p className="text-3xl font-extralight">Start practicing interviews with AI</p>
        </div>

        <form onSubmit={handleSubmit((data) => {
          console.log(data);
        })} className="w-sm flex flex-col gap-2">

          {/* FirstName */}
          <div className="flex flex-col items-start w-full gap-0.5">
            <label htmlFor="Name">Firstname</label>
            <input {...register("firstName", {

              required: "Firstname is required",
              maxLength: {
                value: 20,
                message: "Firstname should be less than 20"
              },
              minLength: {
                value: 3,
                message: "Firstname should be greater than 3"
              }

            })
            }
              placeholder="Enter your firstname"
              className="px-4 py-2 rounded-md outline-gray-400 outline-1 w-full font-light text-sm" />
            <p className="text-red-600 text-sm mt-1">{errors.firstName?.message}</p> {/* need optimization */}
          </div>

          {/* LastName */}
          <div className="flex flex-col items-start w-full gap-0.5">
            <label htmlFor="Name">Lastname</label>
            <input {...register("lastName", {

              required: "Lastname is required",
              maxLength: {
                value: 20,
                message: "Lastname should be less than 20"
              },
              minLength: {
                value: 3,
                message: "Lastname should be greater than 3"
              }

            })
            }
              placeholder="Enter your lastname"
              className="px-4 py-2 rounded-md outline-gray-400 outline-1 w-full font-light text-sm" />
            <p className="text-red-600 text-sm mt-1">{errors.lastName?.message}</p>
          </div>

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
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/,
                message: "Password must include uppercase, lowercase, number, and symbol"
              }

            })
            }
              placeholder="Create your password"
              className="px-4 py-2 rounded-md outline-gray-400 outline-1 w-full font-light text-sm" />
            <p className="text-red-600 text-sm mt-1">{errors.password?.message}</p>
          </div>

          {/* ConfirmPassword */}
          <div className="flex flex-col items-start w-full gap-0.5">
            <label htmlFor="Password" >Confirm password</label>
            <input type="password" {...register("confirmPassword", {

              required: "Please confirm your password",
              validate: (value) => value === password || "Passwords do not match"

            })
            }
              placeholder="Confirm your password"
              className="px-4 py-2 rounded-md outline-gray-400 outline-1 w-full font-light text-sm" />
            <p className="text-red-600 text-sm mt-1">{errors.confirmPassword?.message}</p>
          </div>

          <button type="submit" className="bg-black text-white px-10 py-3 w-full rounded-md mt-2 outline-black cursor-pointer hover:bg-neutral-800">Create account</button>
        </form>
      </div>
    </>
  )
}

export default Register