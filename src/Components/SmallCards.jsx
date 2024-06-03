import { Card, Col, Tooltip } from 'antd';
import '../styles.css'
import { useState } from 'react';
// import roti_sabzi from '../images/roti_sabzi.jpg'


const SmallCards = ({
  playlist_id,
  title,
  isSelected,
  onClick
}) => {

    const[clicked, Setclicked] = useState(false);
  const[d, setd]= useState(null);
  const [borderColor, setBorderColor] = useState('');
  
  return (
    <Col xs={24} sm={24} md={12} lg={8} xl={8} className="my-0">
         
          <Card
          
          title={title}
          key={playlist_id} 
        onClick={() => {
          setBorderColor('blue');
          onClick();
        }}
          className='carry-card'
        //   loading={loading}
          bordered
          style={{
            // display: 'flex',
            // flexDirection: 'column',
            // // height: '100px',
            // boxShadow: '0 4px 6px rgba(0,0,0,0.1),0 4px 6px rgba(0,0,0,0.1)',
            
            // borderRadius: '8px',
            // marginTop: '10px',
            border: isSelected ? `1px solid blue` : '',
          }}
          hoverable
        >
          
        </Card>
        
    </Col>
  );
};

export default SmallCards;
  