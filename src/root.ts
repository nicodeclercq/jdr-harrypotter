import ReactDOM from "react-dom/client";

export const ReactAppRoot = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export const ReactPortalAppRoot = ReactDOM.createRoot(
  document.getElementById("portal") as HTMLElement
);
