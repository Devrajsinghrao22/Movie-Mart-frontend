import React,{ useState, useEffect } from "react";
import { Button, Spin, Skeleton  } from "antd";
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { upperCase } from "lodash";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Header";
import useRequireAuth from "../Components/useRequireAuth";

const dummyData = {
    // image: "https://via.placeholder.com/150",
    image:
      "https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png",
    username: "JohnDoe",
    phone: "123-456-7890",
    location: "New York",
    role: "Developer",
  };


const UserProfile = () => {
    useRequireAuth("/");


    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const token = localStorage.getItem("token"); // Assuming you store the token in localStorage after login
            const response = await fetch("http://localhost:5000/auth/getprofile", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (response.ok) {
              const data = await response.json();
              setUserProfile(data);
            } else {
              throw new Error("Failed to fetch user profile");
            }
          } catch (error) {
            setError(error.message);
          }
        };
    
        fetchUserProfile();
      }, []);
    
  const handleLogout = () => {
    localStorage.clear("token");
    navigate("/");
  };

    return(
        <Sidebar>
        <div
        className="flex justify-center items-center mt-20"
      >
        <div
          style={{
            maxWidth: "20rem",
            padding: "2rem",
            backgroundColor: "#fff",
            boxShadow:
              "0 0 10px rgba(0, 0, 0, 0.2)",
            // borderRadius: "0.5rem",
            height: "300px",
          }}
        >
          {userProfile ? (
            // <>
            //   <div
            //     style={{
            //       marginTop: "-80px",
            //       display: "flex",
            //       justifyContent: "center",
            //       alignItems: "center",
            //     }}
            //   >
            //     <div
            //       style={{
            //         boxShadow: "0 0 10px rgba(0, 0, 0, 0.6)",
            //         display: "flex",
            //         justifyContent: "center",
            //         alignItems: "center",
            //         height: "100px",
            //         width: "100px",
            //         borderRadius: "50%",
            //       }}
            //     >
            //       <div
            //         style={{
            //           display: "flex",
            //           justifyContent: "center",
            //           alignItems: "center",
            //           backgroundColor: 'blue',
            //           borderRadius: "50%",
            //           margin: "1px",
            //           height: "94%",
            //           width: "94%",
            //         }}
            //       >
            //         <UserOutlined style={{ fontSize: "4rem", color: "white" }} />
            //       </div>
            //     </div>
            //   </div>
            //   <div style={{ textAlign: "center" }}>
            //     <h2
            //       style={{
            //         marginTop: "1rem",
            //         fontSize: "1.75rem",
            //         fontWeight: "600",
            //         color: "#4a5568",
            //       }}
            //     >
            //       {userProfile?.username}
            //     </h2>
            //     <p
            //       style={{
            //         marginTop: "0.5rem",
            //         fontSize: "0.875rem",
            //         color: "#4a5568",
            //         fontsize: '10px'
            //       }}
            //     >
            //       {upperCase(userProfile?.role)}
            //     </p>
            //   </div>
            //   <div style={{ marginTop: "1.5rem" }}>
            //     <div
            //       style={{
            //         display: "flex",
            //         justifyContent: "space-between",
            //         alignItems: "center",
            //         gap: '2px',
            //         fontSize: "0.875rem",
            //         color: "#4a5568",
            //         gap: '10px'
            //       }}
            //     >
            //       <span style={{fontSize: '18px', fontWeight: "600" }}>Name:</span>
            //       <span style={{fontSize: '18px'}}>{userProfile?.name}</span>
            //     </div>
            //     <div
            //       style={{
            //         display: "flex",
            //         justifyContent: "space-between",
            //         alignItems: "center",
            //         marginTop: "0.5rem",
            //         fontSize: "0.875rem",
            //         color: "#4a5568",
            //         gap: '10px'
            //       }}
            //     >
            //       <span style={{fontSize: '18px', fontWeight: "600" }}>Email:</span>
            //       <span style={{fontSize: '18px'}}>{(userProfile?.email)}</span>
            //     </div>
            //   </div>
            //   <div
            //     style={{
            //       display: "flex",
            //       justifyContent: "center",
            //       marginTop: "2rem",
            //     }}
            //   >
            //     <button 
            //     onClick={handleLogout} 
            //     style={{ color: "red" }}>
            //       <LogoutOutlined /> Logout
            //     </button>
            //   </div>
            // </>

            <>
             <div className="flex justify-center items-center mt-[-80px]">
                <div className="shadow-md flex justify-center items-center h-24 w-24 rounded-full">
                  <div className="flex justify-center items-center bg-blue-500 rounded-full m-1 h-[94%] w-[94%]">
                    <UserOutlined className="text-4xl text-white" />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h2 className="mt-4 text-xl font-semibold text-gray-700">
                  {userProfile?.username}
                </h2>
                <p className="mt-2 text-sm text-gray-700">
                  {upperCase(userProfile?.role)}
                </p>
              </div>
              <div className="mt-6">
                <div className="flex justify-between items-center gap-2 text-sm text-gray-700">
                  <span className="text-lg font-semibold">Name:</span>
                  <span className="text-lg">{userProfile?.name}</span>
                </div>
                <div className="flex justify-between items-center mt-2 text-sm text-gray-700 gap-2">
                  <span className="text-lg font-semibold">Email:</span>
                  <span className="text-lg">{userProfile?.email}</span>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLogout}
                  className="text-red-500 flex items-center gap-2"
                >
                  <LogoutOutlined /> Logout
                </button>
              </div></>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spin size="medium" />
              <Skeleton active />
              <div>
                <Button
                  onClick={handleLogout}
                  className="text-white bg-blue-500"
                >
                  <span>
                    <LogoutOutlined /> Logout
                  </span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      </Sidebar>
    )
}

export default UserProfile;