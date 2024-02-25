import React from 'react';
import { IoArrowRedoCircleOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

interface NavbarProps {
  showRedoToHomeButton: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showRedoToHomeButton }) => {
  return (
    <nav>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/1280px-Rick_and_Morty.svg.png" alt="logo" />
      {showRedoToHomeButton && (
        <Link to="/">
          <button className='redoToHome'>
            <IoArrowRedoCircleOutline />
          </button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
