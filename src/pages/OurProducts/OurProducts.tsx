import { ProductList } from '@/components';
import { SectionTitle } from '@/components/ui';

const OurProducts = () => {
  return (
    <div>
      <SectionTitle className="mb-8">Our Products</SectionTitle>
      <ProductList />
    </div>
  );
};

export default OurProducts;
