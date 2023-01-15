import '../styles/globals.css'
import { AppProps } from 'next/app'
import { NextPage } from 'next';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from '../lib/context/authContext';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}; 

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <AuthContextProvider>
      <Component {...pageProps} />
      <ToastContainer 
      theme="colored"
      autoClose={3000}
      />
      </AuthContextProvider>
  )
}

export default MyApp