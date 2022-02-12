import { Routes, Route } from "react-router-dom";
import { HostelList, HostelDetail } from './student'
import Landing from './registration/landing';
import SignUp from './registration/signUp';
import SignIn from './registration/signIn';

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/hostels" element={<HostelList />} />
        <Route path="/hostels/:id" element={<HostelDetail />} />
        <Route path="/" element={<Landing />} />
        <Route path='/home' element={<Landing />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;