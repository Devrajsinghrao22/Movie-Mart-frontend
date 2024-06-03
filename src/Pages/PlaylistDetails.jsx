import Sidebar from "../Components/Header";
import { Row, Col, Card, Empty, Skeleton, Button } from "antd";
import React, { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import PlaylistCards from "../Components/PlaylistCards";
import { PlusOutlined } from "@ant-design/icons";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { flatMap } from "lodash";
import useRequireAuth from "../Components/useRequireAuth";


const PlaylistDetails = () => {
  useRequireAuth("/");

  const { playlist_id } = useParams();

  const [playlistdetails, Setplaylistdetails] = useState([]);
  const [loading, Setloading] = useState(true);
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
  //   const playlists = [
  //     {
  //       name: 'My Playlist',
  //       description: 'A collection of my favorite songs',
  //       createdAt: '2024-06-02T06:05:41.397Z',
  //     },
  //     {
  //       name: 'Workout Jams',
  //       description: 'High energy songs for working out',
  //       createdAt: '2024-05-28T14:20:30.123Z',
  //     },
  //     {
  //       name: 'Workoutfwfwojeoj Jams',
  //       description: 'High energyijsfjjoij songs for working out',
  //       createdAt: '2024-05-28T14:20:30.123Z',
  //     },
  //     {
  //       name: 'Workoutfwfiojwfwojeoj Jafdiowjioj  ms',
  //       description: 'High energyijsfjjofjwjfiow ijfoi wejfoiji owjfioj jijij songs for working out',
  //       createdAt: '2024-05-28T14:20:30.123Z',
  //     },
  //     // Add more playlists as needed
  //   ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    Setloading(true);
    const getPlaylistDetails = async (req, res) => {
      try{
        const result = await fetch(
            "http://localhost:5000/playlist/playlistdetails",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                playlist_id,
              }),
            }
          );
          if (result.ok) {
            const data = await result.json();
            Setplaylistdetails(data.data || []);
            Setloading(false);
          } else {
            Setloading(false);
            throw new Error("Failed to fetch Order data.");
          }
      }
      catch (error) {
        console.error(error);
      } finally {
        Setloading(false); // Ensure loading is set to false in both success and error cases
      }
    };
    getPlaylistDetails();
  }, []);
  return (
    <Sidebar>
      <div className="text-2xl font-bold mb-2 flex flex-col sm:flex-row justify-between items-center "><span>Movies</span>
      <Button loading={loading} onClick={() => {
        navigate('/search')
      }} className="bg-blue-500 text-white flex items-center justify-center hover:text-blue-500"><PlusOutlined className=""/>Add New Movie</Button>
      </div>
      
{loading ? (
        <Row gutter={[16, 16]}>
          {[...Array(4)].map((_, index) => (
            <Col key={index} xs={24} sm={12} md={12} lg={8} xl={6}>
              <Card>
                <Skeleton active />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Row gutter={[16, 16]} className="mt-5">
          {playlistdetails.length > 0 ? (
            playlistdetails.map((movie) => (
              <Col key={movie.playlist_id} xs={24} sm={12} md={12} lg={8} xl={6}>
                <MovieCard movie={movie} />
              </Col>
            ))
          ) : (
            <div className="flex h-full w-full justify-center items-center mt-20">
              <Empty description="No Movies in this Playlist" />
            </div>
          )}
        </Row>
      )}

    </Sidebar>
  );
};

export default PlaylistDetails;
