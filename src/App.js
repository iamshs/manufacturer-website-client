import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Blog from './Pages/Blogs/Blog';
import AddProduct from './Pages/Dashboard/AddProduct';
import AddReview from './Pages/Dashboard/AddReview';
import Dashboard from './Pages/Dashboard/Dashboard';
import MakeAdmin from './Pages/Dashboard/MakeAdmin';
import ManageOrders from './Pages/Dashboard/ManageOrders';
import ManageProduct from './Pages/Dashboard/ManageProduct';
import MyOrders from './Pages/Dashboard/MyOrders';
import MyProfile from './Pages/Dashboard/MyProfile';
import Payment from './Pages/Dashboard/Payment';
import Deliver from './Pages/Home/Deliver';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import RequireAdmin from './Pages/Login/RequireAdmin';
import RequireAuth from './Pages/Login/RequireAuth';
import SignUp from './Pages/Login/SignUp';
import NotFound from './Pages/NotFound/NotFound';
import Portfolio from './Pages/Portfolio/Portfolio';
import Footer from './Pages/Shared/Footer';
import Navbar from './Pages/Shared/Navbar';


function App() {
  return (
    <div>
      <Navbar />
     <Routes>
       <Route path='/' element={<Home />}></Route>
       <Route path='/login' element={<Login />}></Route>
       <Route path='/signup' element={<SignUp />}></Route>
       <Route path='deliver/:_id' element={<RequireAuth>
           <Deliver />
       </RequireAuth>}>
       </Route>
       <Route path='/dashboard' element={
         <RequireAuth>
           <Dashboard/>
         </RequireAuth>
         
       }>
         <Route index element={<MyProfile></MyProfile>}></Route>
         <Route path='/dashboard/orders' element={<MyOrders />} ></Route>
         <Route path='/dashboard/review' element={<AddReview />} ></Route>
         <Route path="order/:id" element={<Payment></Payment>}></Route>
         <Route path='/dashboard/admin' element={<RequireAdmin><MakeAdmin /></RequireAdmin>} ></Route>
         <Route path='/dashboard/addProduct' element={<RequireAdmin><AddProduct /></RequireAdmin>} ></Route>
         <Route path='/dashboard/manageProduct' element={<RequireAdmin><ManageProduct/></RequireAdmin>} ></Route>
         <Route path='/dashboard/manageOrder' element={<RequireAdmin><ManageOrders /></RequireAdmin>} ></Route>
       </Route>
       <Route path='/portfolio' element={<Portfolio></Portfolio>} />
       <Route path='/blog' element={<Blog></Blog>} />
       <Route path='*' element={<NotFound />} />
     </Routes>
     <ToastContainer />
     <Footer />
     
    </div>
  );
}

export default App;
