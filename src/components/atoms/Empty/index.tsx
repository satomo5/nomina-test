import Iconify from "../Iconify";
import "./style.scss";

export default function Empty({ height = "60vh" }: { height?: string }) {
  return (
    <div className="empty" style={{ height: height }}>
      <Iconify icon="line-md:coffee-half-empty-twotone-loop" />
      <p>No data showed</p>
    </div>
  );
}
