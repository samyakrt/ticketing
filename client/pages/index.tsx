import React from 'react';
import axios from 'axios';
import { User } from '../types/user';
import {  InferGetServerSidePropsType } from 'next';

export const getServerSideProps = (async () => {
  const { data } = await axios.get<User>('http://ticketing.dev/api/users/current-user')
  return { props: { user: data } }
})
 

const LandingPage= ({ user  } : InferGetServerSidePropsType<typeof getServerSideProps>) => {

  return (<div>
    hello
  </div>)
}
 
export default LandingPage
