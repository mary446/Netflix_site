// import React, {useState, useEffect} from 'react'
// import axios from './axios';
// function Row({title, fetchUrl}) {

//   const [movies, setMovies]= useState([]);

//   useEffect(()=> {
//     async function fetchData(){
//       const request = await axios.get(`/movie/550?api_key = d4d92f337fd0f887a4632d5bb8e705d7`);
      

//     }
//     fetchData();
//   },[fetchUrl]);

//   return (
//     <div>
//       <h2>{title}</h2>
//     </div>
//   )
// }

// export default Row

// import React, { useState, useEffect } from 'react';
// import axios from './axios';
// import './Row.css';
// import ModalVideo from 'react-modal-video';
// import YouTube from 'react-youtube';
// import movieTrailer from 'movie-trailer';

// const baseurl = "https://image.tmdb.org/t/p/original/";

// function Row({ title, fetchUrl, isLargeRow }) {
//   const [movies, setMovies] = useState([]);
//   const [trailerUrl, setTrailerUrl] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   // Add these state variables

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get(fetchUrl, {
//           params: {
//             api_key: 'd4d92f337fd0f887a4632d5bb8e705d7',
//           },
//         });

//         // console.log(response);
//         setMovies(response.data.results);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }

//     fetchData();
//   }, [fetchUrl]);

//   const opts = {
//     height: "390",
//     width: "100",
//     playerVars: {
//       autoplay: 1,
//     },
//   };

//   const handleClick = (movie) => {
//     if (trailerUrl) {
//       setTrailerUrl("");
//     } else {
//       movieTrailer(movie?.name || "", { id: true })
//         .then((url) => {
//           console.log('Movie Name:', movie?.name);
//           console.log('Trailer URL:', url);
//           setTrailerUrl(url);
//           setIsOpen(true); // Open the modal when the trailer URL is set
//         })
//         .catch((error) => console.log('Error fetching trailer:', error));
//     }
//   };

//   return (
//     <div className='row'>
//       <h2>{title}</h2>
//       <div className='row__posters'>
//         {movies.map((movie) => (
//           <img
//             key={movie.id}
//             onClick={() => handleClick(movie)}
//             className={`row__poster ${isLargeRow && "row__posterLarge"}`}
//             src={`${baseurl}${
//               isLargeRow ? movie.poster_path : movie.backdrop_path}`}
//             alt={movie.name}
//           />
//         ))}
//       </div>
//       {/* Use react-modal-video for displaying the trailer */}
//       <ModalVideo
//         channel='youtube'
//         isOpen={isOpen}
//         videoId={trailerUrl && trailerUrl.split('v=')[1]}
//         onClose={() => {
//           setTrailerUrl("");
//           setIsOpen(false);
//         }}
//       />
//     </div>
//   );
// }

// export default Row; 

import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import ModalVideo from 'react-modal-video';

const baseurl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow, channelUrl }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(fetchUrl, {
          params: {
            api_key: 'd4d92f337fd0f887a4632d5bb8e705d7',
          },
        });

        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "", { channel: channelUrl })
        .then((url) => {
          console.log('Movie Name:', movie?.name);
          console.log('Trailer URL:', url);
          setTrailerUrl(url);
          setIsOpen(true);
        })
        .catch((error) => console.log('Error fetching trailer:', error));
    }
  };

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row__posters'>
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
            src={`${baseurl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      <ModalVideo
        channel='youtube'
        isOpen={isOpen}
        videoId={trailerUrl && trailerUrl.split('v=')[1]}
        onClose={() => {
          setTrailerUrl("");
          setIsOpen(false);
        }}
      />
    </div>
  );
}

export default Row;
