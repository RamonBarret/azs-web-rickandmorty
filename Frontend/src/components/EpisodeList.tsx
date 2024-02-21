import React from 'react';
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className='main'>
      <div className='body'>
        <div className='img-logo'>
            <img src="../assets/logo.png" alt="" />
        </div>
        <h2>Episodes</h2>
        <div className='container'>
            <ul>
                {data?.episodes.results.map((episode: Episode) => ( 
                <div key={episode.id} className='card'> 
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
  );
};

export default EpisodeList;
