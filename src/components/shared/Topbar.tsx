import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queries";

const Topbar = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5 relative">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-700/5 to-dark-2/80 opacity-80"></div>

        <Link to="/" className="flex gap-3 items-center relative z-10 hover-scale-subtle transition-all duration-300">
          <img
            src="/assets/images/Mirani-Well-Logo.png"
            alt="Mirani Well logo"
            width={130}
            height={32}
            className="object-contain hover:brightness-110 transition-all duration-300"
          />
        </Link>

        <div className="flex gap-4 items-center relative z-10">
          <Button
            variant="ghost"
            className="shad-button_ghost rounded-full w-10 h-10 flex items-center justify-center glass-effect-light hover:bg-dark-3/50 transition-all duration-300 group"
            onClick={() => signOut()}>
            <img
              src="/assets/icons/logout.svg"
              alt="logout"
              className="w-4 h-4 group-hover:scale-110 transition-all duration-300"
            />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full animate-pulse-subtle bg-gradient-to-r from-primary-500 to-accent-1 opacity-60 blur-sm"></div>
              <img
                src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                alt="profile"
                className="h-10 w-10 rounded-full object-cover border-2 border-primary-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(157,110,249,0.6)] relative z-10"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-2 z-20 shadow-md"></span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
