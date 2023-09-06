import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { getLikedMovies } from "../api";
import styled from "styled-components";
import { Navbar } from "../components/Navbar";
import { Card } from "../components/Card";
import { useSelector } from "react-redux";

export const MyList = () => {
  const [movies, setMovies] = useState([]);
  const [email, setEmail] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { movies: mov } = useSelector((state) => state.netflix);
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else navigate("/login");
  });

  const getMovies = async () => {
    const {
      data: { movies },
    } = await axios.post(getLikedMovies, { email });
    setMovies(movies);
  };

  onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (onscroll = null);
  };

  useEffect(() => {
    if (email) {
      getMovies();
    }
  }, [email]);

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
          {movies.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                isLiked={true}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;
