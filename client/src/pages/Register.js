export default function Register() {
  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Register</h1>

      <div className="container">
        <div className="row">
          <div className="col-lg-4 offset-lg-4">
            <form>
              <input
                type="text"
                placeholder="Enter your email"
                className="form-control"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
