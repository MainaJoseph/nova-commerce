import React from 'react';
import Container from './components/Container';
import Carousel from './components/banners/Carousel';
import { products } from '@/utils/Product';




export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <Carousel />
      </Container>
      <div>
  {products.map((product: any) => (
    <div key={product.id}>
      {product.name}
    </div>
  ))}
</div>

    </div>

  );
}
