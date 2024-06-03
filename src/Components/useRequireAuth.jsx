import { useEffect } from 'react';

const useRequireAuth = (redirectPath) => {
  useEffect(() => {
    
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming you store the token in localStorage after login
        const response = await fetch("http://localhost:5000/auth/allow", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          window.location.href = redirectPath;
        }
      } catch (error) {
        // setError(error.message);
        console.error("Error in login:", error);      }
    };

    fetchUserProfile();
  }, [redirectPath]);

  return;
};

export default useRequireAuth;
