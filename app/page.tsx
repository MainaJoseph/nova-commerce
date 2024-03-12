import { IProductParams } from "@/actions/getProducts";
import HomePage from "./HomePage";

interface HomeProps {
  searchParams: IProductParams;
}

const Home: React.FC<HomeProps> = ({ searchParams }) => {
  return (
    <div>
      <HomePage searchParams={searchParams} />
    </div>
  );
};

export default Home;
