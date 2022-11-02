import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ArtContainer } from "./components/art-container/art-container";
import { Header } from "./components/header/header";
import { Party } from "./components/party/party";

const theme = createTheme({
  typography: {
    fontFamily: `"Oswald","Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 400,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path="/" element={<ArtContainer />} />
            <Route path="/party" element={<Party />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export { App };
