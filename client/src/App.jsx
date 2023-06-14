import "bootstrap/dist/css/bootstrap.min.css";
import router from "./router";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import store from "./stores/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
