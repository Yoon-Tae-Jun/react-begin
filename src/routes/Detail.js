import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
function Detail() {
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const {id} = useParams();
    const getMovie = async() =>{
      const json = await(
        await fetch(
          `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
          )
      ).json();
      console.log(json)
      setMovie(json.data.movie);
      setLoading(false);
    };
    useEffect(() =>{
      getMovie();
    },[])

    return (
      <div>
        {loading ? (
          <h1>Loading...</h1>
        ) :(
          <div>
              <h3>date: {movie.date_uploaded}</h3>
              <img src={movie.large_cover_image}/>
              <h2>Title: {movie.title}</h2>
              <p><b>genres</b></p>
              <ul>
                {movie.genres.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
              
            </div>
        )}
      </div>
    );
  }
  export default Detail;