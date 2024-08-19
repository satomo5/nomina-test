import Iconify from "../Iconify";
import "./style.scss";

export default function Loader({ height = "60vh" }: { height?: string }) {
  return (
    <div className="loading" style={{ height: height }}>
      <Iconify icon="eos-icons:bubble-loading" />
      <p>Loading</p>
    </div>
  );
}
