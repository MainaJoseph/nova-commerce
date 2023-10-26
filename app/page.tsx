import React from 'react';
import Container from './components/Container';
import Carousel from './components/banners/Carousel';
import { products } from '@/utils/Product';
import { TruncateText } from '@/utils/TruncateText';




export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <Carousel />
      </Container>
      <div>
  {products.map((product: any) => (
    <div key={product.id}>
      {TruncateText(product.name)}
    </div>
  ))}
</div>

    </div>

  );
}
