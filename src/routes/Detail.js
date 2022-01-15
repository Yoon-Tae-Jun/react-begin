import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import styles from "./Detail.module.css";
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
      
      setMovie(json.data.movie);
      setLoading(false);
    };
    useEffect(() =>{
      getMovie();
    })

    return (
      <div>
        {loading ? (
        <div className={styles.loader}>
          <span><b>Loading...</b></span>
        </div>
        ) :(
          <div>
              <h1>{movie.title}<hr/></h1>
              <h3>date: {movie.date_uploaded}</h3>
              <img src={movie.large_cover_image} alt = "cover_image"/>
              
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