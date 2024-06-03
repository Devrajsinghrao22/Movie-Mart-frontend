// src/components/MovieCard.js
import React from 'react';
import { Card, Divider } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const PlaylistCards = ({ playlist }) => {
    const navigate = useNavigate();
    const formattedDate = moment(playlist.created_at).format('dddd, D MMMM YYYY h:mm a');
  return (
    <Card
      key={playlist.playlist_id}
      className='carry-card'
      bordered
      style={{
        position: 'relative', 
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1),0 4px 6px rgba(0,0,0,0.1)',
        height: '100%', // Ensure the card takes full height
      }}
      hoverable
    //   cover={
    //     <img
    //       alt={movie.Title}
    //       src={movie.Poster}
    //       style={{ height: 200, objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
    //     />
    //   }
    onClick={() => navigate(`/home/playlist/${playlist.playlist_id}`)}
    >
       <div style={{ flexGrow: 1 }}  className='mb-7'>
        <span className='text-xl font-bold'>{playlist.name}</span>
        <Divider className='mb-1 mt-3'/>
        <span style={{ fontSize: '14px', marginTop: '8px' }}>{playlist.description}</span>
      </div>
      <div style={{ position: 'absolute', bottom: '16px', right: '16px' }}>
        <span style={{ fontSize: '12px', color: 'gray' }}>{formattedDate}</span>
      </div>
    </Card>
  );
};

export default PlaylistCards;
