import '../style/HomePage/card.css'
import BestSeller from '../components/BestSeller';
import NewestProducts from '../components/NewestProducts';
const Homepage = () => {

  return (
    <>
      <NewestProducts />
      <br></br>
      <BestSeller/>
    </>
  );
};

export default Homepage;