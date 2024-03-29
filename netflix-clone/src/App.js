import React from 'react';
import './App.css';
import Row from './Row1';
import requests from './requests';
import Banner from'./Banner';
import Nav from './Nav'
function App() {
  return (
    <div className="App">
    <Nav/>
    <Banner/>
    <Row title="Netflix Originals"fetchUrl={requests.fetchNetflixOriginals}
    isLargeRow
    />
    <Row title="Top Rated"fetchUrl={requests.fetchTopRated}/>
    <Row title="Trending Now"fetchUrl={requests.fetchTrending}/>
    <Row title="Comedy Movies"fetchUrl={requests.fetchComedyMovies}/>
    <Row title="Action Movies"fetchUrl={requests.fetchActionMovies}/>
    <Row title="Horror Movies"fetchUrl={requests.fetchHorrorMovies}/>
    <Row title="Romance Movies"fetchUrl={requests.fetchRomanceMovies}/>
    <Row title="Documentaries"fetchUrl={requests.fetchDocumentaries}/>

    </div>
  );
}

export default App;
