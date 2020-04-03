import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { FetchGit } from './i-request/fetch';

const Container:React.FunctionComponent<{}> = () => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    getUserInfo();
  }), [];
  async function getUserInfo() {
    try {
      const res = await FetchGit.get('/users/urnotzane');
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div></div>
  );
}

export const App = Container;