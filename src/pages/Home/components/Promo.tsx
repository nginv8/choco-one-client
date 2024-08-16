import { ImageComponent } from '@/components';

function Promo() {
  return (
    <section>
      <div className="grid grid-cols-3 grid-rows-2 gap-5">
        <div className="relative col-span-3 row-span-2 overflow-hidden rounded shadow-sm lg:col-span-2">
          <ImageComponent
            src="./assets/img/promo/main-baner-1.png"
            alt=""
            className="aspect-video size-full object-cover"
          />
        </div>

        <div className="relative hidden overflow-hidden rounded shadow-sm lg:col-span-1 lg:row-span-1 lg:block">
          <ImageComponent
            src="./assets/img/promo/promo-baner-1.png"
            alt=""
            className="aspect-video size-full object-cover"
          />
        </div>

        <div className="relative hidden overflow-hidden rounded shadow-sm lg:col-span-1 lg:row-span-1 lg:block">
          <ImageComponent
            src="./assets/img/promo/promo-baner-2.png"
            alt=""
            className="aspect-video size-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Promo;
