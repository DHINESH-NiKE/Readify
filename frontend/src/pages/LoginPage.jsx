import { Header } from "../components/Header";
import { Login } from "../components/Login";

export const LoginPage = () => {
  return (
    <>
      <Header />
      <div className="min-h-vh grid grid-cols-2">
        <div className="bg-[url('/images/login-bg.png')] bg-cover bg-center bg-no-repeat"></div>
        <Login />
      </div>
    </>
  );
};
