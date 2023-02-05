import React , {useEffect , useState} from 'react';
import './product.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import ProductContainer from './ProductContainer';


function Home() {
  const [open, setOpen] = useState(false);

   // check if screen is less then 600px;
   useEffect(() => {
    if(window.innerWidth <= 600) setOpen(true);
  },[setOpen]);
  

  return (
    <main className="main-container">
      <Sidebar open={open} />
      <ProductContainer open={open} setOpen={setOpen} />
    </main>
  )
}

export default Home;