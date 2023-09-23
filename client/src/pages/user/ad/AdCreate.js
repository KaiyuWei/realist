import { useState } from "react";
import Sidebar from "../../../components/nav/Sidebar";
import { useNavigate } from "react-router-dom";

export default function AdCreate() {
  // states that indicates the auth status (if the user is an angency or a customer)
  const [sell, setSell] = useState(false);
  const [rent, setRent] = useState(false);

  const navigate = useNavigate();

  const handleSell = () => {
    setSell(true);
    setRent(false);
  };

  const handleRent = () => {
    setSell(false);
    setRent(true);
  };

  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">AdCreate</h1>
      <Sidebar />
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ marginTop: "-14%" }}
      >
        <div className="col-lg-6">
          <button
            onClick={handleSell}
            className="btn btn -primary btn-lg col-12 p-5"
          >
            Sell
          </button>
          {sell && "show sell house or land options"}
        </div>
        <div className="col-lg-6">
          <button
            onClick={handleRent}
            className="btn btn -primary btn-lg col-12 p-5"
          >
            Rent
          </button>
          {rent && "show rent house or land options"}
        </div>
      </div>
    </div>
  );
}
