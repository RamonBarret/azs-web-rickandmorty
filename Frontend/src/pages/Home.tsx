import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom'; 
import Navbar from '../components/Navbar';
import FavoriteFilter from './FavoriteFilter';
import Footer from '../components/Footer';

import { CgSearch } from "react-icons/cg";
import { MdOutlineFilterAltOff, MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";



interface Character {
  id: string;
}

interface Episode {
  id: string;
  name: string;
  episode: string;
  air_date: string;
  characters: Character[];
}

interface EpisodesQueryResult {
  episodes: {
    results: Episode[];
  };
}

const EPISODES_QUERY = gql`
  query {
    episodes {
      results {
        id
        name
        episode
        air_date
        characters {
          id
        }
      }
    }
  }
`;

const Home: React.FC = () => {
  const { loading, error, data } = useQuery<EpisodesQueryResult>(EPISODES_QUERY);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searched, setSearched] = useState<boolean>(false);

  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const [viewedEpisodes, setViewedEpisodes] = useState<string[]>([]);

  if (loading) return (
    <div className='loading-container'>
      <div className='loading-card'>
        <p>Loading...</p>
      </div>
    </div>
  );
  if (error) return <p>Error :(</p>;

  const filteredEpisodes = data?.episodes.results.filter(
    (episode: Episode) =>
      episode.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchSubmit = () => {
    setSearched(true);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearched(false);
  };

  // Definindo uma função para alternar entre favoritar e desfavoritar um episódio
  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Função para marcar um episódio como visto
  const toggleViewed = (id: string) => {
    if (viewedEpisodes.includes(id)) {
      setViewedEpisodes(viewedEpisodes.filter(episodeId => episodeId !== id));
    } else {
      setViewedEpisodes([...viewedEpisodes, id]);
    }
  };

  // Atualização da lógica de filtragem para incluir apenas os episódios favoritados
  const filteredFavorites = showFavorites ? data?.episodes.results.filter(
    episode => favorites.includes(episode.id)
  ) : [];
  
  const episodesToRender = searched ? (filteredEpisodes || []) : (showFavorites ? (filteredFavorites || []) : (data?.episodes.results || []));

  return (
    <div className='body'>
      <Navbar showRedoToHomeButton={false}/>
      <div className='main'>
        <div className='container-currentPage'>
          <h1>Episodes</h1>
          <FavoriteFilter setShowFavorites={setShowFavorites} showFavorites={showFavorites} />
        </div>
        <div className='input-container'>
          <input
            type='text'
            placeholder='Enter the episode name to search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type='submit' onClick={handleSearchSubmit}>
            <CgSearch />
          </button>
          <button onClick={handleClearSearch} style={{ display: searched ? 'inline-block' : 'none' }}>
            <MdOutlineFilterAltOff />
          </button>
        </div>

        <div className='container'>
        {showFavorites && filteredFavorites && filteredFavorites.length === 0 && (
          <div className="container_noResultsMessage">
            <h2>There are no favorite episodes selected yet</h2>
            <img src="https://w0.peakpx.com/wallpaper/653/714/HD-wallpaper-rick-morty-x-breaking-bad.jpg" alt="exception-default" />
          </div>
        )}

        {!showFavorites && searched && filteredEpisodes && filteredEpisodes.length === 0 && (
          <div className="container_noResultsMessage">
            <h2>Episode not found... </h2>
            <p></p>
            <img src="https://w0.peakpx.com/wallpaper/653/714/HD-wallpaper-rick-morty-x-breaking-bad.jpg" alt="exception-default" />
          </div>
        )}
          <div className="cards-container">
            {episodesToRender?.map((episode: Episode) => ( 
              <div className={`card ${viewedEpisodes.includes(episode.id) ? 'viewed' : ''}`}>
                <div className='container-button-actions'>
                  <button onClick={() => toggleViewed(episode.id)}>
                    <div className='container-button-epViewed'>
                      {viewedEpisodes.includes(episode.id) ? <GrCheckboxSelected /> : <GrCheckbox />}
                      <p>Episode Viewed</p>
                    </div>
                  </button>
                  <button onClick={() => toggleFavorite(episode.id)}>
                      {favorites.includes(episode.id) ? <MdFavorite /> : <MdFavoriteBorder />}
                  </button>
                </div>
                <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSWmeSlzWqi86Dtepy3lIvJs1TcZCHTIhLqH9GlD_Om6qp2wwrG" alt="episode-img-generic" />
                <div className="episode-info">
                  <span><strong>Episode:</strong> {episode.episode}</span>
                  <span><strong>Name:</strong> {episode.name}</span>
                  <span><strong>Air Date:</strong> {episode.air_date}</span>
                  <span><strong>Characters:</strong> {episode.characters.length}</span>
                </div>
                <div className='container-button'>
                  <Link to={`/episode/${episode.id}`}>
                    <button className='epDetails'>Episode Details</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
