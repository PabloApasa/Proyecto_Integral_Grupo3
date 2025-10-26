export default function Estrella({ top, left, onClick }) {
  return (
    <div
      className="estrella aparecer"
      style={{ top: `${top}%`, left: `${left}%` }}
      onClick={onClick}
    >
      ★
    </div>
  );
}
