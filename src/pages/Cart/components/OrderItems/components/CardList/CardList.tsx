import useBoundStore from '@/store/useBoundStore';
import CardItem from './components/CardItem';

const CardList = () => {
  const cartItems = useBoundStore((state) => state.cartItems);

  return (
    <div className="flex flex-col items-center gap-4">
      {Object.values(cartItems).map((item) => (
        <CardItem key={`card-item-${item.id}`} item={item} />
      ))}
    </div>
  );
};

export default CardList;
