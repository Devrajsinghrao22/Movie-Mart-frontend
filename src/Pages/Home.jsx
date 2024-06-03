import Sidebar from "../Components/Header";
import { Row, Col, Card, Spin, Skeleton, Empty, Button } from "antd";
import React, { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import PlaylistCards from "../Components/PlaylistCards";
import { PlusOutlined } from '@ant-design/icons';
import { Routes, Route, useNavigate } from 'react-router-dom';
import useRequireAuth from "../Components/useRequireAuth";


const Home = () => {
  useRequireAuth("/");

  const [movieData, Setmoviedata] = useState([]);
  const [loading, Setloading] = useState(false)
  const [allplaylists, Setplaylists] = useState([]);
  const navigate = useNavigate();
  // useEffect(() => {
  //     const fetchapi = async () => {
  //         const result = await fetch('https://www.omdbapi.com/?apikey=9f963ea7&s=man')
  //         console.log(result)
  //         const data = await result.json();
  //         Setmoviedata(data.Search)
  //     }
  //     fetchapi();
  // },[])
  const playlists = [
    {
      name: 'My Playlist',
      description: 'A collection of my favorite songs',
      createdAt: '2024-06-02T06:05:41.397Z',
    },
    {
      name: 'Workout Jams',
      description: 'High energy songs for working out',
      createdAt: '2024-05-28T14:20:30.123Z',
    },
    {
      name: 'Workoutfwfwojeoj Jams',
      description: 'High energyijsfjjoij songs for working out',
      createdAt: '2024-05-28T14:20:30.123Z',
    },
    {
      name: 'Workoutfwfiojwfwojeoj Jafdiowjioj  ms',
      description: 'High energyijsfjjofjwjfiow ijfoi wejfoiji owjfioj jijij songs for working out',
      createdAt: '2024-05-28T14:20:30.123Z',
    },
    // Add more playlists as needed
  ];
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    Setloading(true);
    const getallplaylist = async (req, res) => {
      const result = await fetch(
        "http://localhost:5000/playlist/getallplaylists",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.ok) {
        const data = await result.json();
        Setplaylists(data.data || []);
        Setloading(false)
        console.log("playlist: ",allplaylists)
      } else {
        Setloading(false)
        throw new Error("Failed to fetch Order data.");
      }
    };
    getallplaylist();
  }, []);
  return (
    <Sidebar>
      <div className="text-2xl font-bold mb-2 flex flex-col sm:flex-row justify-between items-center "><span>Playlists</span>
      <Button loading={loading} onClick={() => {
        navigate('/home/playlist/addnewplaylist')
      }} className="bg-blue-500 text-white flex items-center justify-center hover:text-blue-500"><PlusOutlined className=""/>Add New Playlist</Button>
      </div>
      {loading ? (<Row gutter={[16, 16]} className="mt-5">
          {[...Array(4)].map((_, index) => (
            <Col key={index} xs={24} sm={12} md={12} lg={8} xl={6}>
              <Card>
                <Skeleton active />
              </Card>
            </Col>
          ))}
        </Row>) : (
        <Row gutter={[16, 16]} className="mt-5">
        { allplaylists.length > 0 ? (
          allplaylists.map((playlist) => (
            <Col key={playlist.playlist_id} xs={24} sm={12} md={12} lg={8} xl={6}>
              <PlaylistCards playlist={playlist} />
            </Col>
          )) 
        ) : (
          <div className="flex h-full w-full justify-center items-center mt-20"><Empty description="No Playlist" /></div>
        )

        }
         <Col key={"add_new_playlist"} xs={24} sm={12} md={12} lg={8} xl={6}>
         {/* <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button> */}
           
        </Col>
      </Row>
      )}
      
    </Sidebar>
  );
};

export default Home;
