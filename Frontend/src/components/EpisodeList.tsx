import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

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

const EpisodeList: React.FC = () => {
  const { loading, error, data } = useQuery<EpisodesQueryResult>(EPISODES_QUERY);
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // Filtrar os episódios com base no termo de pesquisa
  const filteredEpisodes = data?.episodes.results.filter(
    (episode: Episode) =>
      episode.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Determinar a lista de episódios a serem renderizados
  const episodesToRender = searchTerm ? filteredEpisodes : data?.episodes.results;

  return (
    <div className='body'>
      <div className='main'>
        <header>
            <h1>Episodes</h1>
        </header>
        <div className='input-container'>
          <input
              type='text'
              placeholder='Enter the episode name to search'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className='container'>
            <div>
                <ul>
                    {episodesToRender?.map((episode: Episode) => ( 
                    <div key={episode.id} className='card'> 
                        <img src="" alt="espisode-img-generic" />
                        <li>
                            <span>Episode: {episode.episode}</span>
                            <span>Name: {episode.name}</span>
                            <span>Air Date: {episode.air_date}</span>
                            <span>Characters: {episode.characters.length}</span>
                        </li>
                        <button>Episode Details</button>
                    </div>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeList;
