import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdErrorOutline } from 'react-icons/md';

import { LoadingIndicator, SectionTitle } from '@/components/ui';
import { routesList } from '@/data';
import { useDynamicPage } from '@/hooks';

type Props = {
  pageName: 'about-us' | 'delivery' | 'privacy-policy' | 'terms-and-conditions';
  pageTitle: string;
};

const Page: FC<Props> = ({ pageName, pageTitle }) => {
  const { isLoading, error, data } = useDynamicPage(pageName);

  const navigate = useNavigate();
  const goToNotFound = () => navigate(routesList.notFound.path);

  useEffect(() => {
    if (error && !data?.content) goToNotFound();
  }, [error, data]);

  return (
    <div className="mx-auto w-full max-w-4xl rounded-lg bg-white px-4 py-10 md:px-8 lg:py-14">
      <SectionTitle className="mb-6 lg:mb-8">{data?.title || pageTitle}</SectionTitle>

      {isLoading && (
        <div className="flex min-h-32 items-center justify-center p-5">
          <LoadingIndicator variant="info" />
        </div>
      )}

      {error && (
        <div className="flex min-h-32 items-center justify-center p-5">
          <p className="inline-flex items-center text-gray-400">
            <MdErrorOutline className="me-2 size-5 min-h-5 min-w-5" />
            Something went wrong. We couldn&apos;t load this page.
          </p>
        </div>
      )}

      {!isLoading && !error && data?.content && (
        <div
          className="prose prose-slate mx-auto w-full max-w-3xl lg:prose-lg"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: data.content,
          }}
        />
      )}
    </div>
  );
};

export default Page;
