import { Outlet } from 'react-router-dom';
import { Navbar } from '../components';

function HomeLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
export default HomeLayout;
