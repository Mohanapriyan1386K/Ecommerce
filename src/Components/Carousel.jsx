import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography, Button } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import cursol1 from "../assets/img/cursol1.jpg";
import cursol2 from "../assets/img/cursol2.jpg";
import cursol3 from "../assets/img/cursol3.jpg";

const images = [
  { src: cursol1, title: "Welcome to Our Website", desc: "Explore amazing features and offers" },
  { src: cursol2, title: "Trusted by Thousands", desc: "Join our growing community today" },
  { src: cursol3, title: "Fast & Reliable", desc: "We deliver excellence every time" },
];

function Carousel() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      {images.map((img, i) => (
        <Box
          key={i}
          sx={{
            backgroundImage: `url(${img.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100vh',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: index === i ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            zIndex: index === i ? 1 : 0,
          }}
        >
          {index === i && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '10%',
                transform: 'translateY(-50%)',
                color: '#fff',
                maxWidth: 600,
              }}
            >
              <Typography variant="h3" fontWeight="bold" gutterBottom color='black'>
                {img.title}
              </Typography>
              <Typography variant="h6" mb={3} color='primary'>
                {img.desc}
              </Typography>
              <Button variant="contained" color="primary">
                Learn More
              </Button>
            </Box>
          )}
        </Box>
      ))}

      <IconButton
        onClick={prevSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          left: 16,
          transform: 'translateY(-50%)',
          color: 'black',
          backgroundColor: 'rgba(0,0,0,0.3)',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' },
        }}
      >
        <ArrowBackIos />
      </IconButton>

      <IconButton
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          right: 16,
          transform: 'translateY(-50%)',
          color: 'black',
          backgroundColor: 'rgba(0,0,0,0.3)',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' },
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
}

export default Carousel;
