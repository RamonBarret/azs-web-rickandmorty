import React from 'react';
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

interface FavoriteFilterProps {
  setShowFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  showFavorites: boolean;
}

const FavoriteFilter: React.FC<FavoriteFilterProps> = ({ setShowFavorites, showFavorites }) => {
  const handleToggleFavorites = () => {
    setShowFavorites(prevState => !prevState);
  };

  return (
    <button onClick={handleToggleFavorites} className={showFavorites ? 'active-filter' : ''}>
      {showFavorites ? <MdFavorite /> : <MdFavoriteBorder />}
      Favorites
    </button>
  );
};

export default FavoriteFilter;