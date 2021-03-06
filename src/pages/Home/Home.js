import styles from "./Home.module.css";

import { backend } from "../../backend/config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// components
import MazeDetail from "../../components/MazeDetail";
import Loading from "../../components/Loading";

const Home = () => {
  const [mazes, setMazes] = useState(undefined);
  const [error, setError] = useState(undefined);

  const loadingMazes = mazes === undefined;
  const loadingError = error === undefined;

  useEffect(() => {
    const getAllMazes = async () => {
      fetch(backend + "/mazes")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Ocorreu um erro, por favor tente mais tarde.");
        })
        .then((data) => {
          data = data.data;

          data.forEach((item) => {
            if (item.name.length > 8) {
              item.name = item.name.substr(0, 8);
              item.name = item.name.concat("...");
            }
            item.created_at = new Date(item.created_at).toLocaleDateString(
              "pt-BR"
            );
          });

          setMazes(data);
        })
        .catch((error) => {
          setError(error);
        });
    };
    getAllMazes();
  }, []);

  if (loadingMazes && loadingError) {
    return <Loading />;
  }

  if (!loadingError) {
    return (
      <div className="loading">
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.home}>
        <h2>Jogos criados recentemente:</h2>
        {/*
          <form onSubmit={handleSubmit} className={styles.search_form}>
            <input
              type="text"
              placeholder="Nome do jogo..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-dark">Pesquisar</button>
          </form>
          */}
      </div>

      <div className={styles.mazes_container}>
        {mazes && mazes.map((maze) => <MazeDetail key={maze.id} maze={maze} />)}
      </div>

      {mazes && mazes.length === 0 && (
        <div className={styles.nomazes}>
          <p>N??o foram encontrados jogos</p>
          <Link to="/mazes/create" className="btn">
            Criar primeiro jogo
          </Link>
        </div>
      )}
    </>
  );
};

export default Home;
