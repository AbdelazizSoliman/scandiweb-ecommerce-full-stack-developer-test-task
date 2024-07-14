import { Component } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components';

class HomeLayout extends Component {
  render() {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  }
}

export default HomeLayout;
