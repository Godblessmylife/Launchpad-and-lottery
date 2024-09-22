import React from "react";
import clsx from "clsx";
import {
  Box,
  Container,
  Avatar,
  Hidden,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Wallet from "./Wallet";
import { Menu } from "@mui/icons-material";
import connectors from "../connection/connectors";
import { WalletConnectConnector } from "web3-react-walletconnect-connector";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import { useEffect, useState } from "react";
import AccountDialog from "./AccountDialog";
import NetworkDialog from "./NetworkDialog";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  linkItems: {
    paddingRight: 20,
    paddingTop: 7,
    fontWeight: 600,
    paddingLeft: 15,
    fontSize: 15,
  },
  logo: {
    height: 50,
    [theme.breakpoints.down("md")]: {
      height: 30,
    },
  },
  paper: {
    top: "67px !important",
    left: "unset !important",
    right: "0 !important",
    width: "45%",
    borderRadius: "0",
    backgroundColor: "black",
    transformOrigin: "16px -1px !important",
  },
  listItem: {
    justifyContent: "center",
  },
  navbarButton: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    padding: "7px 18px 7px 18px",
    border: "none",
    borderRadius: 10,
    fontWeight: 400,
    letterSpacing: 0.4,
    textTransform: "none",
    fontSize: 15,
    "&:hover": {
      background: theme.palette.primary.hover,
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
      marginLeft: 15,
      width: 150,
    },
  },
  connectedButton: {
    color: "white",
    padding: "7px 5px 7px 10px",
    border: "none",
    borderRadius: 10,
    fontWeight: 400,
    letterSpacing: 0.4,
    textTransform: "none",
    fontSize: 15,
    "&:hover": {
      background: theme.palette.primary.hover,
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
      marginLeft: 15,
      width: 150,
    },
  },
  connectedAddress: {
    backgroundColor: theme.palette.primary.light,
    color: "white",
    padding: "4px 18px 4px 18px",
    border: "none",
    borderRadius: 10,
    fontWeight: 400,
    letterSpacing: 0.4,
    textTransform: "none",
    fontSize: 15,

    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
      marginLeft: 15,
      width: 150,
    },
  },
  numbers: {
    color: "#f9f9f9",
    fontSize: 14,
  },
  list: {
    width: "250px",
    borderLeft: "5px solid #7825D5",
    borderColor: "#7825D5",
    height: "100%",
    backgroundColor: "#000000",
  },
  fullList: {
    width: "auto",
  },
}));

const Appbar = () => {
  const classes = useStyles();

  const [accountDialog, setAccountDialog] = useState(false);

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const { active, account, activate, deactivate, chainId } =
    useActiveWeb3React();

  useEffect(() => {
    if (!active && localStorage.connected === "yes") {
      const connector = connectors.injected;
      createConnectHandler(connector);
    }
  }, [active]);

  const handleLogout = () => {
    localStorage.connected = "none";
    deactivate();
  };

  const handleWalletConnect = (connectorType = "injected") => {
    try {
      let connector;
      if (connectorType === "injected") {
        connector = connectors.injected;
      } else if (connectorType === "walletConnect") {
        connector = connectors.walletconnect;
      } else if (connectorType === "unstoppable") {
        connector = connectors.uauth;
      } else {
        connector = connectors.injected;
      }

      createConnectHandler(connector);
      setAccountDialog(false);
    } catch (error) {}
  };

  const createConnectHandler = async (connector) => {
    try {
      console.log("trying connection with ", connector);
      // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
      if (connector instanceof WalletConnectConnector) {
        connector.walletConnectProvider = undefined;
      }

      await activate(connector);
      localStorage.connected = "yes";
    } catch (error) {
      console.error("createConnectHandler", error);
    }
  };

  const handleWalletClick = () => {
    try {
      setAccountDialog(true);
    } catch (error) {}
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{ paddingTop: 30 }}>
        {[
          { name: "Home", url: "/" },
          { name: "Stake", url: "/stake" },
          { name: "Launchpad", url: "/launchpad" },
          { name: "INO", url: "/ino" },
          { name: "Farm", url: "/farm" },
        ].map((tab, index) => (
          <Link activeClass="active" to={tab.url}>
            <ListItem
              button
              key={tab.name}
              onClick={toggleDrawer(anchor, false)}
            >
              <ListItemText primary={tab.name} className={classes.menuTitle} />
            </ListItem>
          </Link>
        ))}{" "}
        {[{ name: "Swap", id: "https://swap.polkabridge.org/" }].map(
          (tab, index) => (
            <a href={tab.id} className={classes.mobileLink}>
              <ListItem button key={tab.name}>
                <ListItemText
                  primary={tab.name}
                  className={classes.menuTitle}
                />
              </ListItem>
            </a>
          )
        )}
      </List>
    </div>
  );
  return (
    <Box style={{ position: "relative", zIndex: 10 }}>
      <header>
        <AccountDialog
          open={accountDialog}
          handleLogout={handleLogout}
          handleClose={() => setAccountDialog(false)}
          handleConnection={handleWalletConnect}
        />

        <Hidden mdDown>
          <Container>
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              mt={1}
            >
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <NetworkDialog selectedNetwork={chainId} />
                <Wallet onWalletClick={handleWalletClick} />
              </Box>
            </Box>
          </Container>
        </Hidden>
        <Hidden mdUp>
          <Container>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    marginRight: "2rem",
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  <img
                    src="https://launchpad.polkabridge.org/img/logo-white.png"
                    className={classes.logo}
                  />
                  <div
                    style={{
                      paddingLeft: 2,
                      color: "black",
                      fontWeight: 700,
                      fontSize: 14,
                      textDecoration: "none",
                    }}
                  >
                    PolkaBridge
                  </div>
                </div>
                <Box></Box>
              </Box>

              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Wallet onWalletClick={handleWalletClick} />
              </Box>
              <div>
                {["right"].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <IconButton
                      aria-label="Menu"
                      aria-haspopup="true"
                      className={classes.menuIcon}
                      onClick={toggleDrawer(anchor, true)}
                    >
                      <Menu style={{ color: "white", size: 32 }} />
                    </IconButton>

                    <SwipeableDrawer
                      anchor={anchor}
                      disableSwipeToOpen={false}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                      onOpen={toggleDrawer(anchor, true)}
                    >
                      {list(anchor)}
                    </SwipeableDrawer>
                  </React.Fragment>
                ))}
              </div>
            </Box>
          </Container>
        </Hidden>
      </header>
    </Box>
  );
};

export default Appbar;
