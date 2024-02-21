import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EpisodeList from './components/EpisodeList';
import EpisodeDetail from './components/EpisodeDetail';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<EpisodeList />} />
          <Route path="/episode/:id" element={<EpisodeDetail />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
