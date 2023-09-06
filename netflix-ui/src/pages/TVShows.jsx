import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import styled from "styled-components";
import { Navbar } from "../components/Navbar";
import { Slider } from "../components/Slider";
import { NotAvailable } from "../components/NotAvailable";
import { SelectGenre } from "../components/SelectGenre";

export const TVShows = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { movies, genresLoaded, genres } = useSelector(
    (state) => state.netflix
  );

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ genres, type: "tv" }));
  }, [genresLoaded]);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (onscroll = null);
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });
  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        <SelectGenre genres={genres} type="movie" />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </Container>
  );
};

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;
