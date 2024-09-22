import "./App.css";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import { StyledEngineProvider } from "@mui/material/styles";
import { Fragment } from "react";
import Home from "./pages/Home/Home";
import { Provider } from "react-redux";
import store from "./store";
import { createWeb3ReactRoot, Web3ReactProvider } from "web3-react-core";
import { NetworkContextName } from "./constants";
import getLibrary from "./utils/getLibrary";
import { BlockUpdater } from "./hooks/useBlockNumber";
import MulticallUpdater from "./state/multicall/updater";
import { Grid, Box, Hidden } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "common/SideBar";
import Appbar from "common/Appbar";
import LaunchpadDetails from "pages/Launchpad/LaunchpadDetails";
import LaunchpadPurchase from "pages/Launchpad/LaunchpadPurchase";
import InoDetails from "pages/Ino/InoDetails";
import InoPurchases from "pages/Ino/InoPurchases";

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

function App() {
  return (
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <MulticallUpdater />
              <BlockUpdater />
              <CssBaseline />
              <Router>
                <Box style={{ minHeight: "100vh" }}>
                  <Grid container style={{ height: "100%" }}>
                    <Hidden mdDown>
                      <Grid
                        item
                        md={2}
                        xs={12}
                        style={{ backgroundColor: "#270E44" }}
                      >
                        <SideBar />
                      </Grid>
                    </Hidden>
                    <Grid
                      item
                      md={10}
                      xs={12}
                      mt={1}
                      style={{
                        background: `linear-gradient(90deg,#020203,#250c41)`,
                        height: "100%",
                        minHeight: "97vh",
                      }}
                    >
                      <Appbar />
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/:page/" element={<Home />} />
                        <Route path="/:page/:subpage" element={<Home />} />
                        <Route path="/:page/:subpage/:id" element={<Home />} />

                        <Route
                          path="/:page/view-launchpad"
                          element={<LaunchpadDetails />}
                        />
                        <Route
                          path="/purchase-launchpad"
                          element={<LaunchpadPurchase />}
                        />
                        <Route path="/view-ino/:id" element={<InoDetails />} />
                        <Route
                          path="/ino-purchases"
                          element={<InoPurchases />}
                        />
                      </Routes>
                    </Grid>
                  </Grid>
                </Box>
              </Router>
            </ThemeProvider>
          </StyledEngineProvider>
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </Provider>
  );
}

export default App;
