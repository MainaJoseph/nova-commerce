interface IParams {
  productid?: string;
}

const Product = ({ params }: { params: IParams }) => {
  console.log("params", params);

  return <div>Product Page</div>;
};

export default Product;
