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
      <Navbar showRedoToHomeButton={true}/>
      <div className='main'>
        <div className='container-currentPage'>
            <h1>Episode details</h1>
        </div>
        <div className='container_epInformation'>
          <p><strong>Name:</strong> {episode.name}</p>
          <p><strong>Episode:</strong> {episode.episode}</p>
          <p><strong>Air Date:</strong> {episode.air_date}</p>
        </div>
        <div className='characters'>
          <div className='container-characters-tittle'>
              <h3>characters</h3>
          </div>
          <div className='container-characters'>
            {episode.characters.map((character: Character) => (
              <div key={character.id} className='card-characters' >
                <img src={character.image} alt={character.name} />
                  <div className='characters-info'>
                    <span><strong>Name:</strong> {character.name}</span>
                    <span><strong>Species:</strong> {character.species}</span>
                    <span><strong>Status:</strong> {character.status}</span>
                  </div>
              </div>
              ))}
          </div>
        </div>
      </div>
    </div> 
  );
};

export default EpisodeDetail;
