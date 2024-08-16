import React, { Suspense } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from '@/components';
import { routesList } from '@/data';
import { LoadingIndicator } from './components/ui';

const queryClient = new QueryClient();

const HomePage = React.lazy(() => import('@/pages/Home/Home'));
const OurProductsPage = React.lazy(() => import('@/pages/OurProducts/OurProducts'));
const AboutPage = React.lazy(() => import('@/pages/About/About'));
const ProductPage = React.lazy(() => import('@/pages/Product/Product'));
const CartPage = React.lazy(() => import('@/pages/Cart/Cart'));
const NotFoundPage = React.lazy(() => import('@/pages/NotFound/NotFound'));
const AccountPage = React.lazy(() => import('@/pages/Account/Account'));
const SignInPage = React.lazy(() => import('@/pages/SignIn/SignIn'));
const SignUpPage = React.lazy(() => import('@/pages/SignUp/SignUp'));
const FavoritePage = React.lazy(() => import('@/pages/Favorite/Favorite'));
const DeliveryPage = React.lazy(() => import('@/pages/Delivery/Delivery'));
const ContactUsPage = React.lazy(() => import('@/pages/ContactUs/ContactUs'));
const PrivacyPolicyPage = React.lazy(() => import('@/pages/PrivacyPolicy/PrivacyPolicy'));
const ResetPasswordPage = React.lazy(() => import('@/pages/ResetPassword/ResetPassword'));
const TermsAndConditionsPage = React.lazy(
  () => import('@/pages/TermsAndConditions/TermsAndConditions')
);
const EmailConfirmatioPage = React.lazy(
  () => import('@/pages/EmailConfirmation/EmailConfirmation')
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Suspense
            fallback={
              <div className="flex h-96 items-center justify-center">
                <LoadingIndicator variant="info" />
              </div>
            }
          >
            <Routes>
              <Route path={routesList.home.path} element={<HomePage />} />
              <Route path={routesList.ourProducts.path} element={<OurProductsPage />} />
              <Route path={`${routesList.product.path}/:productId`} element={<ProductPage />} />
              <Route path={routesList.about.path} element={<AboutPage />} />
              <Route path={routesList.shoppingCart.path} element={<CartPage />} />
              <Route path={routesList.favorite.path} element={<FavoritePage />} />
              <Route path={routesList.signIn.path} element={<SignInPage />} />
              <Route path={routesList.signUp.path} element={<SignUpPage />} />
              <Route path={routesList.account.path} element={<AccountPage />} />
              <Route path={routesList.delivery.path} element={<DeliveryPage />} />
              <Route path={routesList.contactUs.path} element={<ContactUsPage />} />
              <Route path={routesList.privacyPolicy.path} element={<PrivacyPolicyPage />} />
              <Route
                path={routesList.termsAndConditions.path}
                element={<TermsAndConditionsPage />}
              />
              <Route path={routesList.resetPassword.path} element={<ResetPasswordPage />} />
              <Route path={routesList.emailConfirmation.path} element={<EmailConfirmatioPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
