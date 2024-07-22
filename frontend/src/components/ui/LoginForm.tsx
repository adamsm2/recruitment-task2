import { LoginUserRequest } from "../../dto/LoginUserRequest.ts";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { useContext, useMemo, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthApi from "../../api/auth.ts";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../store/AuthContextProvider.tsx";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

type FormFieldProps = {
  name: keyof LoginUserRequest;
  label: string;
  placeHolder: string;
  type: "password" | "email";
  error: FieldError | undefined;
}

const formSchema = yup.object().shape({
  email: yup.string().email("Please provide a valid email").required("Please provide an email"),
  password: yup.string().required("Please provide a password"),
});


const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<LoginUserRequest>({
    resolver: yupResolver(formSchema),
  });

  const authContext = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: AuthApi.loginUser,
    onSuccess: (data) => {
      toast.success("Logged in successfully");
      localStorage.setItem("accessToken", data.accessToken);
      authContext.login(data);
    },
    onError: () => {
      toast.error("Bad credentials");
    },
  });

  const formFields: FormFieldProps[] = useMemo(() => {
    return [
      { name: "email", label: "Your email", placeHolder: "name@company.com", type: "email", error: errors.email },
      { name: "password", label: "Password", placeHolder: "••••••••", type: "password", error: errors.password },
    ];
  }, [errors]);

  const onSubmit: SubmitHandler<LoginUserRequest> = async (data) => {
    setLoading(true);
    try {
      await mutation.mutateAsync(data);
    } catch (e) {
      console.log("Bad credentials");
    }
    setLoading(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {formFields.map((formField) => {
        return (
          <div key={formField.name}>
            <label htmlFor={formField.name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {formField.label}
            </label>
            <div className="p-0.5 rounded-lg bg-aquaGreen-50">
              <input type={formField.type} id={formField.name} {...register(formField.name)}
                     placeholder={formField.placeHolder}
                     className="border border-gray-300 text-gray-900 rounded-lg focus:border-aquaGreen-100 focus:outline-none block w-full p-2.5" />
            </div>
            {formField.error && (
              <p className="text-red-500 text-sm mt-1">{formField.error.message}</p>
            )}
          </div>
        );
      })}
      <button type="submit"
              className="w-full text-white bg-aquaGreen-300 hover:bg-aquaGreen-600 focus:outline-aquaGreen-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign
        in
      </button>
    </form>
  );
};

export default LoginForm;