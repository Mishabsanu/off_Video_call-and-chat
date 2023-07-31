import { ArrowRight } from "lucide-react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Toaster } from "react-hot-toast";
import { isAxiosError } from "axios";
import axios from "../../utils/axios";
import { resetPassword } from "../../utils/Constants";
import { useParams } from "react-router-dom";
interface userResetPasswordData {
  password: string;
  confirmPassword: string;
}
const validate = (values: userResetPasswordData) => {
  const errors: Partial<userResetPasswordData> = {};

  if (!values.password) {
    toast.error("Password is required");
    errors.password = "Password is required";
  } else if (values.password.includes(" ")) {
    toast.error("Password cannot contain spaces");
    errors.password = "Password cannot contain spaces";
  } else if (values.password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    errors.password = "Password must be at least 6 characters long";
  } else if (values.password !== values.confirmPassword) {
    toast.error("Passwords do not match");
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

const ResetPassword = () => {
  const { userId } = useParams();
  // const { token } = useParams();
  console.log(userId);
  // console.log(token);

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<userResetPasswordData>();

  const onSubmit: SubmitHandler<userResetPasswordData> = async (
    data: userResetPasswordData
  ) => {
    const validationErrors = validate(data);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    try {
      const response = await axios.post<userResetPasswordData>(
        `${resetPassword}/${userId}`,
        data
      );
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
              Update your password!!
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
                    New Password{" "}
                  </label>
                  <div className="mt-2">
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="password"
                          placeholder="Password"
                        />
                      )}
                      rules={{ required: "Password is required" }}
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Confirm Password{" "}
                  </label>
                  <div className="mt-2">
                    <Controller
                      name="confirmPassword"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="password"
                          placeholder="confirm Password"
                        />
                      )}
                      rules={{ required: "confirm Password is required" }}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500">
                        {errors.confirmPassword.message}
                      </p>
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
  );
};

export default ResetPassword;
