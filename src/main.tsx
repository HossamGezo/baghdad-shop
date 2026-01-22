// --- Libraries
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";

// --- Components
import AppRouter from "./routes/AppRouter";

// --- Local Files
import store from "./app/store";

// --- Styles
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
);
