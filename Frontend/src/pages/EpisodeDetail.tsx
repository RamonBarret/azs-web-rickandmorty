import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Navbar from '../components/Navbar';

interface EpisodeParams {
    id: string;
    [key: string]: string;
}

interface EpisodeData {
  episode: {
    id: string;
    name: string;
    episode: string;
    air_date: string;
    characters: Character[];
  };
}

interface Character {
  id: string;
  name: string;
  image: string;
  species: string;
  status: string;
}

const EPISODE_QUERY = gql`
  query Episode($id: ID!) {
    episode(id: $id) {
      id
      name
      episode
      air_date
      characters {
        id
        name
        image
        species
        status
      }
    }
  }
`;

const EpisodeDetail: React.FC = () => {
  const { id } = useParams<EpisodeParams>();
  const { loading, error, data } = useQuery<EpisodeData>(EPISODE_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error :(</p>; // Verifica se há erro ou se data é undefined

  const episode = data.episode;

  return (
    <div className='body'>
      <Navbar />
      <div className='main'>
        <div>
          <h2>Episode Detail</h2>
          <p>Episode: {episode.episode}</p>
          <p>Name: {episode.name}</p>
          <p>Air Date: {episode.air_date}</p>
          <h3>Characters</h3>
          <ul>
            {episode.characters.map((character: Character) => (
              <li key={character.id}>
                <img src={character.image} alt={character.name} />
                <p>Name: {character.name}</p>
                <p>Species: {character.species}</p>
                <p>Status: {character.status}</p>
              </li>
            ))}
          </ul>
      </div>
      </div>
    </div>
    
  );
};

export default EpisodeDetail;
