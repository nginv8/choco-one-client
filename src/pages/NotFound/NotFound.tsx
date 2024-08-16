import { routesList } from '@/data';
import { LinkButton } from '@/components';

const NotFound = () => (
  <div className="flex flex-col items-center gap-2 text-center">
    <span className="text-8xl text-gray-400">404</span>
    <h1 className="text-4xl uppercase text-primary-400">Page not found</h1>
    <p className="text-lg">
      The page your are looking for does not exist. It might have been moved or delete.
    </p>
    <LinkButton size="button-lg" to={routesList.home.path} className="mt-2">
      Go Back Home
    </LinkButton>
  </div>
);

export default NotFound;
