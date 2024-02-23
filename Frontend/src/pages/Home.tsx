import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Navbar from '../components/Navbar';
import { CgSearch } from "react-icons/cg";
import { MdOutlineFilterAltOff } from "react-icons/md";

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const filteredEpisodes = data?.episodes.results.filter(
    (episode: Episode) =>
      episode.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const episodesToRender = searched ? (filteredEpisodes || []) : data?.episodes.results;

  const noResultsMessage = searchTerm && filteredEpisodes && filteredEpisodes.length === 0 ? "No episodes found..." : "";

  const handleSearchSubmit = () => {
    setSearched(true);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearched(false);
  };

  return (
    <div className='body'>
      <div className='main'>
        <Navbar />
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
          <button onClick={handleClearSearch}>
            <MdOutlineFilterAltOff />
          </button>
        </div>

        <div className='container'>
          <div className="cards-container">
            {episodesToRender?.map((episode: Episode) => ( 
              <div key={episode.id} className='card'>
                <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSWmeSlzWqi86Dtepy3lIvJs1TcZCHTIhLqH9GlD_Om6qp2wwrG" alt="episode-img-generic" />
                <div className="episode-info">
                  <span>Episode: {episode.episode}</span>
                  <span>Name: {episode.name}</span>
                  <span>Air Date: {episode.air_date}</span>
                  <span>Characters: {episode.characters.length}</span>
                </div>
                <button>Episode Details</button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
