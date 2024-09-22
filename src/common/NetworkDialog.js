import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  bscNetworkDetail,
  ethereumNetworkDetail,
  harmonyNetworkDetail,
  polygonNetworkDetail,
} from "../utils/networkConstants";
import { getCurrentNetworkName, setupNetwork } from "../utils/helper";
import config from "../utils/config";
import { currentConnection } from "../constants";
import etherIcon from "../assets/ether.png";
import binanceIcon from "../assets/binance.png";
import polygonIcon from "../assets/polygon.png";
import { CHANGE_NETWORK } from "../actions/types";
import store from "../store";
import useActiveWeb3React from "../hooks/useActiveWeb3React";
import { connect } from "react-redux";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grow,
  Menu,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  background: {
    width: "100%",
    height: "100%",
    zIndex: 10,
    display: "grid",
    placeItems: "center",
    background: "rgba(0,0,0,0.2)",
  },
  container: {
    width: "100%",
    height: "fit-content",
    padding: 10,
    minHeight: 200,
    maxWidth: 220,
    position: "relative",
    backgroundColor: "#f9f9f9",

    display: "flex",
    alignItems: "center",
    zIndex: 11,
    borderRadius: 16,
    color: "black",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      maxWidth: "95%",
      height: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      height: "max-content",
    },
  },
  root: {
    display: "flex",
    justifyContent: "space-around",
  },
  imgIcon: {
    marginLeft: 10,
    height: 23,
  },
  buttonDrop: {
    display: "flex",
    justifyContent: "space-between",
    color: "black",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "grey",
      color: "#100525",
    },
  },
  main: {
    color: "white",
    backgroundColor: "#100525",
    border: "1px solid rgba(224, 7, 125, 0.7)",
    borderRadius: 60,
    paddingLeft: 15,
    height: 40,
    width: "full-width",
    marginRight: 7,
    paddingTop: 3,
  },
  networkName: {},
}));

const NetworkDialog = ({ account: { currentChain }, selectedNetwork }) => {
  const classes = useStyles();

  const [network, setNetwork] = React.useState(
    parseInt(localStorage.getItem("currentNetwork") || config.chainId)
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { active } = useActiveWeb3React();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!selectedNetwork) {
      return;
    }

    setNetwork(selectedNetwork);
  }, [selectedNetwork]);

  const handleChangeNetwork = (_selected) => {
    store.dispatch({
      type: CHANGE_NETWORK,
      payload: {
        network: getCurrentNetworkName(_selected),
        chain: _selected,
      },
    });
    setNetwork(_selected);
  };

  const handleChange = (_selected) => {
    if (network === _selected) {
      return;
    }
    localStorage.setItem("currentNetwork", _selected);

    // handle network stated when metamask in not available
    if (!active) {
      handleChangeNetwork(_selected);
    }

    if ([56, 97].includes(_selected)) {
      setupNetwork(
        currentConnection === "mainnet"
          ? bscNetworkDetail.mainnet
          : bscNetworkDetail.testnet
      );
    } else if ([137, 80001].includes(_selected)) {
      setupNetwork(
        currentConnection === "mainnet"
          ? polygonNetworkDetail.mainnet
          : polygonNetworkDetail.testnet
      );
    } else if ([1666600000, 1666700000].includes(_selected)) {
      setupNetwork(
        currentConnection === "mainnet"
          ? harmonyNetworkDetail.mainnet
          : harmonyNetworkDetail.testnet
      );
    } else {
      setupNetwork(
        currentConnection === "mainnet"
          ? ethereumNetworkDetail.mainnet
          : ethereumNetworkDetail.testnet
      );
    }
    setNetwork(_selected);
    handleClose();
  };

  const networkNameFromId = (currentNetwork) => {
    console.log(currentConnection);
    console.log(currentNetwork);
    let networkName = "Ethereum";
    if (currentConnection === "testnet") {
      switch (currentNetwork) {
        case 42:
          networkName = "Rinkeby";
          break;
        case 97:
          networkName = "BSC Testnet";
          break;
        case 80001:
          networkName = "Polygon Testnet";
          break;
        default:
          networkName = "Ethereum";
      }
    } else {
      switch (currentNetwork) {
        case 1:
          networkName = "Ethereum";
          break;
        case 56:
          networkName = "BSC";
          break;
        case 137:
          networkName = "Polygon";
          break;
        default:
          networkName = "Ethereum";
      }
    }
    return networkName;
  };
  return (
    <div>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <div
          onClick={handleClick}
          style={{
            paddingLeft: 2,
            color: "white",
            fontWeight: 500,
            fontSize: 15,
            textDecoration: "none",
            marginRight: 10,
            cursor: "pointer",
            border: "2px solid #7825D5",
            borderRadius: 12,
            padding: "7px 15px 7px 15px",
          }}
        >
          {networkNameFromId(network)}
        </div>
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <List>
          <ListItem
            button
            key={1}
            onClick={() =>
              handleChange(currentConnection === "testnet" ? 42 : 1)
            }
          >
            <Box>
              <img src={etherIcon} alt="PBR" height="25px" />{" "}
            </Box>

            <ListItemText>
              <Typography
                variant="h6"
                className={classes.cardTitle}
                textAlign="left"
                fontWeight={600}
                ml={2}
                color={"#212121"}
                fontSize={14}
              >
                Ethereum
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            key={1}
            onClick={() =>
              handleChange(currentConnection === "testnet" ? 97 : 56)
            }
          >
            <Box>
              <img src={binanceIcon} alt="PBR" height="25px" />{" "}
            </Box>
            <ListItemText>
              <Typography
                variant="h6"
                className={classes.cardTitle}
                textAlign="left"
                fontWeight={600}
                ml={2}
                color={"#212121"}
                fontSize={14}
              >
                BSC
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            key={1}
            onClick={() =>
              handleChange(currentConnection === "testnet" ? 80001 : 137)
            }
          >
            <Box>
              <img src={polygonIcon} alt="PBR" height="25px" />{" "}
            </Box>
            <ListItemText>
              <Typography
                variant="h6"
                className={classes.cardTitle}
                textAlign="left"
                fontWeight={600}
                ml={2}
                color={"#212121"}
                fontSize={14}
              >
                Polygon
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
      </Menu>
    </div>
  );
};

const mapStateToProps = (state) => ({
  account: state.account,
});

export default connect(mapStateToProps, {})(NetworkDialog);
