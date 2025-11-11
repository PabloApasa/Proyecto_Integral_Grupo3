import styles from "../../../css/P_5/Proyecto5App.module.css";

export default function Estrella({ top, left, onClick, estado = "aparecer" }) {
  // estado expected: "aparecer" o "desaparecer"
  const claseEstado = styles[estado] || "";
  return (
    <div
      className={`${styles["estrella"]} ${claseEstado}`}
      style={{ top: `${top}%`, left: `${left}%` }}
      onClick={onClick}
    >
      ★
    </div>
  );
}