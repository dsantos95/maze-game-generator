import styles from "./MazeDetail.module.css";

import { Link } from "react-router-dom";

const MazeDetail = ({ maze }) => {
  return (
    <div className={styles.maze}>
      <img src="/sky.png" alt="Céu com estrelas" />
      <h3>{maze.name}</h3>
      <p id='date'>Criado em: {maze.created_at}</p>
      <Link to={`/mazes/${maze.id}`} className='btn'>Detalhes</Link>
    </div>
  )
}

export default MazeDetail