import { useParams } from "react-router-dom";

export default function AccountActivate() {
  // get the token from the params in the routing URL
  const { token } = useParams();

  return (
    <div
      className="display-1 d-flex justify-content-center align-items-center vh-100"
      style={{ marginTop: "-5%" }}
    >
      Please Wait...
    </div>
  );
}
