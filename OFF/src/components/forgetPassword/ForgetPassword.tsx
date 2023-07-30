import { ArrowRight } from "lucide-react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Toaster } from "react-hot-toast";
import { isAxiosError } from "axios";
import axios from "../../utils/axios";
import { forgetPassword} from "../../utils/Constants";

interface userForgetPasswordData {
    email: string;
  }
  
const ForgetPassword = () => {

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const {
      handleSubmit,
      control,
      formState: { errors }, 
    } = useForm<userForgetPasswordData>();
  
    const onSubmit: SubmitHandler<userForgetPasswordData> = async (
      data: userForgetPasswordData
    ) => {
      try {
        const response = await axios.post<userForgetPasswordData>(forgetPassword, data);
        console.log(response);
        toast.success("Signup successful!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
  
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } catch (error) {
        if (isAxiosError(error)) {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ) {
            setError(error.response.data.message);
          }
        }
      }
    };
  return (
<section>
      <div className="grid grid-cols-1 lg:grid-cols-1">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
          Forget Password
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              title=""
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </a>
          </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Email address{" "}
                  </label>
                  <div className="mt-2">
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="email"
                          placeholder="Email"
                        />
                      )}
                      rules={{ required: "Email is required" }}
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Get started <ArrowRight className="ml-2" size={16} />
                  </button>
                  {error && <div className="error_msg">{error}</div>}
                </div>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default ForgetPassword
