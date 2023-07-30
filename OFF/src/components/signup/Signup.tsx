import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import countryList from "react-select-country-list";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Select from "react-select";
import { isAxiosError } from "axios";
import axios from "../../utils/axios";
import { signUpPost } from "../../utils/Constants";
import "./Signup.css";
import { useAppDispatch } from "../../Redux/hooks";
import { setLogin, startLoading } from "../../Redux/auth/authSlice";

interface Option {
  value: string;
  label: string;
}

interface userData {
  userName: string;
  email: string;
  password: string;
  gender: Option | null;
  countrie: Option | null;
  avatar: AvatarOption | null;
  acceptTerms: boolean;
  tokens: {
    accessToken: string;
    refershToken: string;
  };
}

interface AvatarOption {
  id: number;
  name: string;
  avatarUrl: string;
}

const avatarOptions: AvatarOption[] = [
  {
    id: 1,
    name: "Avatar 1",
    avatarUrl:
      "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
  },
  {
    id: 2,
    name: "Avatar 2",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHCZuslFbn42wwA9qw6ywBERhtpr_yOFy3Cw&usqp=CAU",
  },
  {
    id: 3,
    name: "Avatar 3",
    avatarUrl:
      "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
  },
  {
    id: 4,
    name: "Avatar 4",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHCZuslFbn42wwA9qw6ywBERhtpr_yOFy3Cw&usqp=CAU",
  },
  {
    id: 5,
    name: "Avatar 5",
    avatarUrl:
      "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
  },
  {
    id: 6,
    name: "Avatar 6",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHCZuslFbn42wwA9qw6ywBERhtpr_yOFy3Cw&usqp=CAU",
  },
  {
    id: 7,
    name: "Avatar 7",
    avatarUrl:
      "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
  },
  {
    id: 8,
    name: "Avatar 8",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHCZuslFbn42wwA9qw6ywBERhtpr_yOFy3Cw&usqp=CAU",
  },
  {
    id: 9,
    name: "Avatar 9",
    avatarUrl:
      "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
  },
  {
    id: 10,
    name: "Avatar 10",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHCZuslFbn42wwA9qw6ywBERhtpr_yOFy3Cw&usqp=CAU",
  },
  {
    id: 11,
    name: "Avatar 11",
    avatarUrl:
      "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
  },
  {
    id: 12,
    name: "Avatar 12",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHCZuslFbn42wwA9qw6ywBERhtpr_yOFy3Cw&usqp=CAU",
  },
  {
    id: 13,
    name: "Avatar 13",
    avatarUrl:
      "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
  },
  {
    id: 14,
    name: "Avatar 14",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHCZuslFbn42wwA9qw6ywBERhtpr_yOFy3Cw&usqp=CAU",
  },
  {
    id: 15,
    name: "Avatar 15",
    avatarUrl:
      "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
  },
  {
    id: 16,
    name: "Avatar 16",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHCZuslFbn42wwA9qw6ywBERhtpr_yOFy3Cw&usqp=CAU",
  },
  {
    id: 17,
    name: "Avatar 17",
    avatarUrl:
      "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
  },
  {
    id: 18,
    name: "Avatar 18",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHCZuslFbn42wwA9qw6ywBERhtpr_yOFy3Cw&usqp=CAU",
  },
  {
    id: 19,
    name: "Avatar 19",
    avatarUrl:
      "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
  },
  {
    id: 20,
    name: "Avatar 20",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHCZuslFbn42wwA9qw6ywBERhtpr_yOFy3Cw&usqp=CAU",
  },
  {
    id: 21,
    name: "Avatar 21",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMahB5uQpvTdBdY38JQPtnB68YWGvshZXJVw&usqp=CAU",
  },
  {
    id: 22,
    name: "Avatar 22",
    avatarUrl:
      "https://w7.pngwing.com/pngs/490/157/png-transparent-male-avatar-boy-face-man-user-flat-classy-users-icon.png",
  },
  {
    id: 23,
    name: "Avatar 23",
    avatarUrl:
      "https://e7.pngegg.com/pngimages/674/524/png-clipart-professional-computer-icons-avatar-job-avatar-heroes-computer-thumbnail.png",
  },
  {
    id: 24,
    name: "Avatar 24",
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWR1Pof8ViB8t3SDMs9Bj2H6GdBqeo02RJZAjtktnwrhmAxPaoAcLY1_PQikfU0pafzTk&usqp=CAU",
  },

  // ...
];

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm<userData>();

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<userData> = async (data: userData) => {
    const datas = {
      userName: data?.userName,
      email: data?.email,
      password: data?.password,
      gender: data?.gender?.value,
      countrie: data?.countrie?.label,
      avatar: data?.avatar?.avatarUrl,
      acceptTerms: data?.acceptTerms,
    };

    try {
      dispatch(startLoading());
      const response = await axios.post<userData>(signUpPost, datas);
      dispatch(setLogin({ user: response.data, token: response.data.tokens }));
      navigate("/dashboard");
    } catch (error) {
      console.log(error,'error');
      
      if (isAxiosError(error)) {
        if (
          error.response &&
          error.response.data.code >= 400 &&
          error.response.data.code <= 500
        ) {
          setError(error.response.data.error);
        }
      }
    }
  };

  // countries
  const countriess = useMemo(() => countryList().getData(), []);
  const options = countriess.map((country) => ({
    value: country.value,
    label: country.label,
  }));

  // gender
  const genderOptions: Option[] = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];
  const [avatars, setAvatars] = useState<AvatarOption | null>(null);
  const handleAvatarClick = (selectedAvatar: AvatarOption) => {
    setAvatars(selectedAvatar);
    setValue("avatar", selectedAvatar); // Set the selected avatar value in the form state
  };

  return (
    <section className="md:px-40">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="w-full">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
            Sign up
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
            <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-5">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="text-base font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <Controller
                      name="userName"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="text"
                          placeholder="Full Name"
                        />
                      )}
                      rules={{ required: "Name is required" }}
                    />
                    {errors.userName && (
                      <p className="text-red-500">{errors.userName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900"
                  >
                    Email address
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
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      Password
                    </label>
                  </div>
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
                      rules={{ required: "password is required" }}
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      Country
                    </label>
                  </div>
                  <div className="mt-2">
                    <Controller
                      name="countrie"
                      control={control}
                      defaultValue={null}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={options}
                          isClearable={true}
                          placeholder="Select Country"
                        />
                      )}
                      rules={{ required: "Country is required" }}
                    />
                    {errors.countrie && (
                      <p className="text-red-500">{errors.countrie.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      Gender
                    </label>
                  </div>
                  <div className="mt-2">
                    <Controller
                      name="gender"
                      control={control}
                      defaultValue={null}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={genderOptions}
                          isClearable={true}
                          placeholder="Select Gender"
                        />
                      )}
                      rules={{ required: "Gender is required" }}
                    />
                    {errors.gender && (
                      <p className="text-red-500">{errors.gender.message}</p>
                    )}
                  </div>
                </div>
                {errors.avatar && errors.avatar.type === "required" && (
                  <p className="text-red-500">Avatar is required</p>
                )}
              </div>
              <div className="h-[60px]">
                <h6>(optanal)</h6>
                <div className="flex flex-wrap -mx-2 mt-4">
                  {avatarOptions.map((avatar) => (
                    <div
                      key={avatar.id}
                      onClick={() => handleAvatarClick(avatar)}
                      className={`cursor-pointer m-2 p-2 border ${
                        avatars?.id === avatar.id
                          ? "border-blue-500"
                          : "border-gray-300"
                      } rounded-md`}
                    >
                      <img
                        src={avatar.avatarUrl}
                        alt={avatar.name}
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                  ))}
                </div>
                <div className="w-[97%] m-auto py-10">
                  <input
                    type="checkbox"
                    {...register("acceptTerms", { required: true })}
                  />
                  <label className="form-check-label" htmlFor="acceptTerms">
                    I have read and agree to the Terms
                  </label>
                  {errors.acceptTerms && (
                    <p className="text-red-500">Please accept the Terms</p>
                  )}
                  <button
                    type="submit"
                    className=" inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Create Account <ArrowRight className="ml-2" size={16} />
                  </button>
                  {error && <div className="error_msg">{error}</div>}
                </div>
              </div>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </section>
  );
};

export default Signup;
