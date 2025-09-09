import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export const useUserAuth = () => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return; // still fetching, do nothing
    if (!user) {
      navigate("/login"); // redirect to login if no user
    }
  }, [user, loading, navigate]);
};
