import { SectionTitle } from '@/components/ui';
import Benfits from './components/Benfits';
import ProductList from './components/ProductList';
import Promo from './components/Promo';

function Home() {
  return (
    <>
      <Promo />
      <Benfits />
      <SectionTitle>Featured Products</SectionTitle>
      <ProductList />
    </>
  );
}

export default Home;
