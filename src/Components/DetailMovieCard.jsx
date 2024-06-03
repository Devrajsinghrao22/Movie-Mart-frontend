import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Empty,
  Typography,
  Divider,
  Button,
  Modal,
  message,
  Skeleton
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SmallCards from "./SmallCards";
// import styled from 'styled-components';

// const { Title, Text } = Typography;

// const StyledCard = styled(Card)`
//   width: 100%;
//   max-width: 600px;
//   margin: 20px auto;
//   border-radius: 10px;
//   overflow: hidden;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

//   @media (max-width: 768px) {
//     max-width: 100%;
//     padding: 10px;
//   }

//   .ant-card-body {
//     padding: 20px;
//   }
// `;

// const Poster = styled.img`
//   width: 100%;
//   height: auto;
//   border-radius: 10px;
// `;

// const Ratings = styled.div`
//   display: flex;
//   justify-content: space-around;
//   margin-top: 10px;
// `;

const DetailMovieCard = ({ movie }) => {
  const [modalVisible, Setmodalvisible] = useState(false);
  const [allplaylists, Setplaylists] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [carryData, Setcarrydata] = useState({});
  const [playlistLoading, Setplaylistloading] = useState(false);


  const token = localStorage.getItem("token");
  // Setloading(true);

  const getallplaylist = async (movie) => {
    Setcarrydata(prev => ({
      ...prev,
      imdb_id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      rated: movie.Rated,
      image: movie.Poster,
      genre: movie.Genre,
      language: movie.Language,
      imdb_rating: movie.imdbRating
    }))
    Setplaylistloading(true);
    Setmodalvisible(true);
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
      Setplaylistloading(false);
    } else {
      Setplaylistloading(false);
      throw new Error("Failed to fetch Order data.");
    }
  };

  const addMovieToPlaylist = async (movie) => {
    try {
      const token = localStorage.getItem("token");
      const {
        genre,
        image,
        imdb_id,
        imdb_rating,
        language,
        playlist_id,
        rated,
        title,
        year
      } = movie
      
      const response = await fetch(
        "http://localhost:5000/playlist/addmovietoplaylist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            genre,
        image,
        imdb_id,
        imdb_rating,
        language,
        playlist_id,
        rated,
        title,
        year
          }),
        }
      );
      if (response.ok) {
        const reply  = await response.json();
        message.success(`${reply.message}`)
        // Setloading(false);
        // navigate('/home');
        Setmodalvisible(false)
      } else {
        const errorData = await response.json();
        message.error(`${errorData.message}`)
        // Setloading(false);
      }
    } catch (error) {
        // Setloading(false);
      console.error("Error during adding item:", error);
      message.error("An error during creating playlist")
    }
  }

  if (!movie || !movie.Title) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">No Data</p>
      </div>
    );
  }
  return (
    // <StyledCard>
    //   <Row gutter={[16, 16]}>
    //     <Col xs={24} sm={8}>
    //       <Poster src={movie.Poster} alt={`${movie.Title} Poster`} />
    //     </Col>
    //     <Col xs={24} sm={16}>
    //       <Title level={2}>{movie.Title}</Title>
    //       <Text strong>{movie.Year}</Text>
    //       <Divider />
    //       <Text>{movie.Plot}</Text>
    //       <Divider />
    //       <Text><strong>Genre:</strong> {movie.Genre}</Text>
    //       <br />
    //       <Text><strong>Director:</strong> {movie.Director}</Text>
    //       <br />
    //       <Text><strong>Writer:</strong> {movie.Writer}</Text>
    //       <br />
    //       <Text><strong>Actors:</strong> {movie.Actors}</Text>
    //       <Divider />
    //       <Text><strong>Language:</strong> {movie.Language}</Text>
    //       <br />
    //       <Text><strong>Country:</strong> {movie.Country}</Text>
    //       <Divider />
    //       <Text><strong>Awards:</strong> {movie.Awards}</Text>
    //       <Divider />
    //       <Ratings>
    //         {movie.Ratings.map((rating, index) => (
    //           <div key={index}>
    //             <Text strong>{rating.Source}</Text>
    //             <br />
    //             <Text>{rating.Value}</Text>
    //           </div>
    //         ))}
    //       </Ratings>
    //     </Col>
    //   </Row>
    // </StyledCard>
    <>
      <div className=" w-full mx-auto bg-gray-100 shadow-custom rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row w-full">
          <img
            className="p-3 w-full md:w-1/3"
            src={movie.Poster}
            alt={`${movie.Title} Poster`}
          />
          <div className="p-6">
            <div className="flex justify-end">
              <Button
                // loading={loading}
                onClick={() => {
                  getallplaylist(movie);
                }}
                className="bg-blue-500 text-white flex items-center justify-center hover:text-blue-500"
              >
                <PlusOutlined className="" />
                Add to Playlist
              </Button>
            </div>
            <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
            <p className="text-sm text-gray-600 mb-4">{movie.Year}</p>
            <p className="text-gray-800 mb-4">"{movie.Plot}"</p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Genre:</span> {movie.Genre}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Director:</span> {movie.Director}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Writer:</span> {movie.Writer}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Actors:</span> {movie.Actors}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Language:</span> {movie.Language}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Country:</span> {movie.Country}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Awards:</span> {movie.Awards}
            </p>
            <div className="flex flex-col sm:flex-row justify-around mt-4 items-center">
              {movie.Ratings &&
                movie.Ratings.map((rating, index) => (
                  <div key={index} className="text-center">
                    <p className="text-sm font-semibold">{rating.Source}</p>
                    <p className="text-green-600">{rating.Value}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Modal
        footer={<div>
          <Divider />
          <div className="flex justify-end "><Button loading={playlistLoading} onClick={()=>{addMovieToPlaylist(carryData)}} className="bg-blue-500 text-white flex items-center justify-center hover:text-blue-500"><PlusOutlined className=""/>Add</Button></div>
        </div>}
        open={modalVisible}
        onCancel={() => {Setmodalvisible(false)
          Setcarrydata({})
          setSelectedCardId(null);
        }}
      >
        <div className="flex-col">
          <div className="text-xl font-bold mb-3">
            <span>Playlists</span>
          </div>
          {playlistLoading ? (
        <Row gutter={[16, 16]}>
          {[...Array(4)].map((_, index) => (
            <Col key={index} xs={24} sm={24} md={12} lg={8} xl={8} >
              <Card>
                <Skeleton active />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
          <Row gutter={[10, 10]}>
            {allplaylists.length > 0 ? (
              allplaylists.map((playlist) => (
                <SmallCards
                  playlist_id={playlist.playlist_id}
                  title={playlist.name}
                  onClick={() => {
                    setSelectedCardId(playlist.playlist_id);
                    Setcarrydata((prev) => ({
                      ...prev,
                      playlist_id: playlist.playlist_id,
                    }));
                  }}
                  isSelected={selectedCardId === playlist.playlist_id}
                  carry={false}
                />
              ))
            ) : (
              <div className="flex h-full w-full justify-center items-center mt-10">
                <Empty description="No Playlist" />
              </div>
            )}
          </Row>
      )}
        </div>
      </Modal>
    </>
  );
};

// Sample usage

export default DetailMovieCard;
