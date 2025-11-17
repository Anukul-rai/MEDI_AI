import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function OAuthCallback() {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded) {
      navigate(isSignedIn ? "/" : "/login", { replace: true });
    }
  }, [isLoaded, isSignedIn, navigate]);

  return <div>Finishing sign in...</div>;
}
