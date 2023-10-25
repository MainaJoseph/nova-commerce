import React from 'react';
import Container from './components/Container';
import Carousel from './components/banners/Carousel';




export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <Carousel />
      </Container>
    </div>
  );
}
