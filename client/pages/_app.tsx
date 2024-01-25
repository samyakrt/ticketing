import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { serverClient } from '../api/build-client';
import Header from '../components/header';

const MyApp =  ({ Component, pageProps, currentUser }): any => {
  return (
    <div className='container-fluid'>
      <Header currentUser={currentUser} />
      <Component {...pageProps} currentUser={currentUser} />
    </div>
  )
}

MyApp.getInitialProps = async (context) => {
  const client = serverClient(context.ctx);
  const {data } = await client.get('/api/users/current-user').catch(() =>({ data: null}))
return { currentUser: data }
}
export default MyApp
