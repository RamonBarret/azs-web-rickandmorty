import React from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

interface FavoriteFilterProps {
  setShowFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  showFavorites: boolean;
}

const FavoriteFilter: React.FC<FavoriteFilterProps> = ({ setShowFavorites, showFavorites }) => {
  const location = useLocation();

  const handleToggleFavorites = () => {
    setShowFavorites(prevState => !prevState);
    const { pathname } = location;
    const searchParams = new URLSearchParams(location.search);
    if (!showFavorites) {
      searchParams.set('favorites', String(!showFavorites));
    } else {
      searchParams.delete('favorites');
    }
    const updatedSearch = searchParams.toString();
    const newUrl = updatedSearch ? `${pathname}?${updatedSearch}` : pathname;
    window.history.pushState({}, '', newUrl);
  };

  return (
    <button onClick={handleToggleFavorites} className={`episodes-button-FavoriteList ${showFavorites ? 'active-filter' : ''}`}>
      <div className='container-button-epFavoriteList'>
        {showFavorites ? <MdFavorite /> : <MdFavoriteBorder />}
        <p>List of favorite episodes</p>
      </div>
    </button>
  );
};

export default FavoriteFilter;
