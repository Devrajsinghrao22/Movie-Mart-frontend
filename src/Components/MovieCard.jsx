// src/components/MovieCard.js
import React from 'react';
import moment from 'moment';
import { Card } from 'antd';

const { Meta } = Card;

const MovieCard = ({ movie }) => {


  // {moment(movie.added_at).format('dddd, D MMMM YYYY h:mm a')}


  return (
    // <Card
    //   key={movie.imdbID}
    //   className='carry-card'
    //   bordered
    //   style={{
    //     display: 'flex',
    //     flexDirection: 'column',
    //     borderRadius: '8px',
    //     boxShadow: '0 4px 6px rgba(0,0,0,0.1),0 4px 6px rgba(0,0,0,0.1)',
    //     height: '100%', // Ensure the card takes full height
    //   }}
    //   hoverable
    //   cover={
    //     <img
    //       alt={movie.title}
    //       src={movie.image}
    //       style={{ height: 200, objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
    //     />
    //   }
    // >
    //   <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    //     {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    //       <img src={movie.Poster} alt='dalbati' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    //     </div> */}
    //     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
    //       <span style={{fontSize: '15px'}}>{movie.title}</span>
    //       <span style={{ fontSize: '12px', marginTop: '8px' }}>{movie.year}</span>
    //     </div>
    //   </div>
    // </Card>

    // <div className="netflix-card relative flex flex-col bg-black text-white rounded-lg overflow-hidden shadow-lg transform transition-transform duration-200 hover:scale-105">
    //   <img className="w-full h-64 object-cover" src={movie.image} alt={movie.title} />
    //   <div className="p-4">
    //     <h2 className="text-xl font-bold mb-1">{movie.title}</h2>
    //     <p className="text-gray-400 mb-1">Year: {movie.year}</p>
    //     <p className="text-gray-400 mb-1">Rated: {movie.rated}</p>
    //     <p className="text-gray-400 mb-1">Genre: {movie.genre}</p>
    //     <p className="text-gray-400 mb-1">Language: {movie.language}</p>
    //     <p className="text-gray-400 mb-1">IMDb Rating: {movie.imdb_rating}</p>
    //     <p className="text-gray-400">Added on: {moment(movie.added_at).format('dddd, D MMMM YYYY h:mm a')}</p>
    //   </div>
    //   <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">HD</div>
    // </div>


    <div className="netflix-card group relative flex flex-col bg-black text-white rounded-lg overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105">
      <img className="w-full h-64 object-cover" src={movie.image} alt={movie.title} />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-1">{movie.title}</h2>
        <p className="text-gray-400 mb-1">Year: {movie.year}</p>
        <p className="text-gray-400">IMDb Rating: {movie.imdb_rating}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
        <p className="text-gray-400 mb-1">Rated: {movie.rated}</p>
        <p className="text-gray-400 mb-1">Genre: {movie.genre}</p>
        <p className="text-gray-400 mb-1">Language: {movie.language}</p>
        <p className="text-gray-400 mb-1">Added on: {moment(movie.added_at).format('dddd, D MMMM YYYY h:mm a')}</p>
      </div>
      {/* <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">HD</div> */}
    </div>
  );
};

export default MovieCard;
