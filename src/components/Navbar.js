import React from 'react'
import querytree_logo from '../components/querytree_logo.png';


function Navbar() {
  return (
    
    <div className='navbar'>
     
     <div>
     <img src={querytree_logo} alt="QueryTree" className="querytree_logo"/>
     <span className ='navbar-brand'>QueryTree</span> 
     </div>

<ul className='navbar-menu'>
    <li a href='/'>Home</li>
    {/* <li a href='/contact'>Contact</li>
    <li a href='/about'>About Us</li> */}
</ul>

    </div>
  )
}

export default Navbar