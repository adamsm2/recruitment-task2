import LoginForm from "../components/ui/LoginForm.tsx";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen">
      <div className="flex items-center mb-6 text-lg sm:text-2xl font-semibold text-gray-900">
        <TasksIcon />
        TaskManager
      </div>
      <div
        className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign in to your account
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

const TasksIcon = () => {
  return (
    <ClipboardDocumentCheckIcon className="size-10 text-aquaGreen-100" />
  );
};

export default LoginPage;