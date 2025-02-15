import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import FilmCard from '../../components/FilmCard/FilmCard';

function Home() {
    const [films, setFilms] = useState([]);

    // Fetch Films from Backend
    const loadFilms = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/films`);
            setFilms(response.data.data);
            toast.success("Films loaded successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch films!");
            console.error("Error fetching films:", error);
        }
    };

    useEffect(() => {
        loadFilms();
    }, []);

    return (
        <div>
            <h1>🎬 Movie List</h1>

            {films.map((film, index) => {
              const { title, director, poster, releaseYear, language, rating } = film;
              return (
                <FilmCard
                  key={film.id || index} // Use a unique key if available
                  title={title}
                  director={director}
                  poster={poster}
                  releaseYear={releaseYear}
                  language={language}
                  rating={rating}
                />
              );
            })}

            <Toaster />
        </div>
    );
}

export default Home;
