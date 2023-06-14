import { FormUser } from "../components/FormUser";

export const UserPage = () => {
  return (
    <>
      <section className="d-flex float-none pt-lg-5" id="section-front">
        <div className="container">
          <div className="row mb-1">
            <div className="col text-center">
              <h2
                className="display-5"
                style={{ paddingBottom: "0px", marginBottom: "20px" }}
              >
                Register New User
              </h2>
            </div>
          </div>
          <div className="row">
            <FormUser typeForm={"register"} />
          </div>
        </div>
      </section>
    </>
  );
};
