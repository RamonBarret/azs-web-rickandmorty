import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

interface EpisodeParams {
  id: string;
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
  const { loading, error, data } = useQuery(EPISODE_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const episode = data.episode;

  return (
    <div>
      <h2>Episode Detail</h2>
      <p>Episode: {episode.episode}</p>
      <p>Name: {episode.name}</p>
      <p>Air Date: {episode.air_date}</p>
      <h3>Characters</h3>
      <ul>
        {episode.characters.map((character: any) => (
          <li key={character.id}>
            <img src={character.image} alt={character.name} />
            <p>Name: {character.name}</p>
            <p>Species: {character.species}</p>
            <p>Status: {character.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeDetail;

