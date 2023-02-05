import React , {useState} from 'react';
import './product.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import ProductContainer from './ProductContainer';


function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main className="main-container">
      <Sidebar open={open} />
      <ProductContainer open={open} setOpen={setOpen} />
    </main>
  )
}

export default Home;