import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Container:React.FunctionComponent<{}> = () => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    axios.get('https://api.github.com/users/urnotzane');
  }), [];
  return (
    <div></div>
  );
}

export const App = Container;