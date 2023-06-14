
import { FormUser } from "../components/FormUser";

const LoginPage = () => {

    return (
        <section className="container" id="login-section">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="mb-3 mt-5">Login Page</h1>
            
          </div>
          <div className="container">
            <div className="row">
              
              <div className="col justify-content-center">
                <div className="form-signin m-auto">
                  <FormUser typeForm={ true } />
  
                  <div id="buttonDiv" className="mt-3"></div> 
  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
)
}

export default LoginPage