import { SnackbarProvider } from "notistack";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import Alert from "@/ui/Alert";

import "@/assets/styles/global.css";

import App from "./App";
import { store } from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
declare module "notistack" {
  interface VariantOverrides {
    success: {
      description?: string;
      point?: boolean;
    };
    failure: {
      description?: string;
      point?: boolean;
    };
    info: {
      description?: string;
      point?: boolean;
    };
    warning: {
      description?: string;
      point?: boolean;
    };
  }
}

root.render(
  <Provider store={store}>
    <SnackbarProvider
      Components={{
        success: Alert,
        failure: Alert,
        warning: Alert,
      }}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      maxSnack={4}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SnackbarProvider>
  </Provider>,
);
