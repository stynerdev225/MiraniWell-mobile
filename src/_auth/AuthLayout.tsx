import { Outlet, Navigate } from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";

export default function AuthLayout() {
  const { isAuthenticated } = useUserContext();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <div className="mobile-form-wrapper">
          <section className="flex flex-1 justify-center items-center flex-col py-10 px-4 mobile-form-content">
            <Outlet />
          </section>

          <img
            src="/assets/images/side-img.svg"
            alt="Mirani Well background"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </div>
      )}
    </>
  );
}
