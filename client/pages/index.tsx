import React from 'react';
import axios, { AxiosError } from 'axios';
import { User } from '../types/user';
import { InferGetServerSidePropsType, GetServerSideProps, Redirect } from 'next';
import { serverClient } from '../api/build-client';



const LandingPage = ({ currentUser, }) => {
  return (<div>
    hello {currentUser?.email}
  </div>)
}

export const getServerSideProps = async (context) => {
  try {
    const client = serverClient(context)
    const { data } = await client.get<User>('/api/users/current-user')

    return { props: { user: data } }
  } catch (error: unknown) {
    return {
      props: {
        user: null
      }
    }
  }
}


export default LandingPage
