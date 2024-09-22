import { useState } from "react";
import { Button, Typography, Input, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Close } from "@mui/icons-material";
import { Box } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  background: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
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
    minHeight: 400,
    maxWidth: 540,
    position: "relative",
    backgroundColor: "#000000",
    border: "2px solid #7825D5",
    display: "flex",
    alignItems: "center",
    zIndex: 11,
    borderRadius: 16,
    [theme.breakpoints.down("md")]: {
      border: "10px solid #D1FE1D",
      width: "100%",
      maxWidth: "95%",
      height: 350,
    },
    [theme.breakpoints.down("sm")]: {
      height: "max-content",
    },
  },

  heading: {
    color: "#f9f9f9",
    fontWeight: 600,
    textAlign: "center",
    fontSize: 26,
    [theme.breakpoints.down("md")]: {
      fontSize: 20,
    },
  },
  available: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 22,
    fontWeight: 600,
    paddingLeft: 10,
    [theme.breakpoints.down("md")]: {
      fontSize: 16,
    },
  },
  para: {
    color: "#E0247D",
    textAlign: "center",
    fontSize: 16,
    fontWeight: 600,
    [theme.breakpoints.down("md")]: {
      fontSize: "0.8rem",
    },
  },

  cancelButton: {
    width: "140px",
    height: "45px",
    background: "#5E5E5E",
    boxSizing: "border-box",
    borderRadius: "20px",
    fontSize: 16,
    lineHeight: "33px",
    color: "#ffffff",

    [theme.breakpoints.down("md")]: {
      width: "120px",
      fontSize: "0.8rem",
    },
  },
  cancelButton: {
    width: "fit-content",
    backgroundColor: "transparent",
    boxSizing: "border-box",
    border: "1px solid #7825D5",
    borderRadius: "15px",
    fontSize: 15,
    lineHeight: "33px",
    color: "#ffffff",
    fontWeight: 500,
    marginTop: 20,
    marginRight: 10,
    padding: "7px 30px 7px 30px",
    "&:hover": {
      backgroundColor: "transparent",
    },
    [theme.breakpoints.down("md")]: {
      padding: "12px 20px 12px 20px",
      fontSize: 18,
    },
  },
  connectButton: {
    width: "fit-content",
    backgroundColor: theme.palette.buttonDark.bg,
    boxSizing: "border-box",
    border: "1px solid #212121",
    borderRadius: "15px",
    fontSize: 15,
    lineHeight: "33px",
    color: "#ffffff",
    fontWeight: 500,
    marginTop: 20,
    marginLeft: 10,
    padding: "7px 50px 7px 50px",
    "&:hover": {
      backgroundColor: theme.palette.buttonDark.bg,
    },
    [theme.breakpoints.down("md")]: {
      padding: "12px 20px 12px 20px",
      fontSize: 18,
    },
  },

  imageWrapper: {
    background: `linear-gradient(332.86deg, rgba(146, 103, 219, 0.3) 26.45%, rgba(215, 86, 236, 0.3) 69.5%)`,
    borderRadius: 12,
    padding: 2,
  },

  input: {
    backgroundColor: "transparent",
    borderRadius: 5,
    height: 50,
    border: "none",
    fontSize: 18,
    width: "70%",
    color: "white",
    padding: 10,
    outline: "none",
    [theme.breakpoints.down("sm")]: {
      height: 50,
      fontSize: 15,
    },
  },
  inputWrapper: {
    border: "1px solid #4A3F55",
    borderRadius: 15,
    width: "100%",
  },
  maxBtn: {
    backgroundColor: theme.palette.buttonDark.bg,
    color: theme.palette.buttonDark.color,
    padding: 0,
    padding: "10px 15px 10px 15px",
    fontSize: 12,
    borderRadius: 15,
    marginLeft: 10,
    outline: "none",
    height: 40,

    [theme.breakpoints.down("sm")]: {
      height: 30,
      marginTop: 10,
      marginRight: 5,
    },
  },
}));

const PurchasePopup = ({
  purchasePackage,
  resetPopup,
  setQuantity,
  maxPurchase,
  minQuantity,
  currentPackage,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const [error, setError] = useState("");

  const changeInput = (value) => {
    if (value >= minQuantity && value <= maxPurchase) {
      setQuantity(value);
      setError("");
    } else {
      setError("Input is invalid");
    }
  };

  const handleMax = () => {
    setQuantity(maxPurchase);
  };
  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <div className="h-100 w-100">
          <div className="d-flex justify-content-end" onClick={resetPopup}>
            <Close
              style={{ cursor: "pointer" }}
              className={classes.closeIcon}
            />
          </div>
          <div className="d-flex flex-column justify-content-around">
            <div className="mb-3">
              <Typography
                variant="h4"
                className={classes.heading}
                fontWeight={700}
              >
                Purchase NFT
              </Typography>
            </div>

            <div className="mt-3 d-flex justify-content-center">
              <Box
                mb={2}
                display="flex"
                flexDirection={"row"}
                justifyContent="space-between"
                alignItems="center"
                style={{ maxWidth: 430, width: "100%" }}
              >
                <Box
                  display="flex"
                  flexDirection={"row"}
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Box className={classes.imageWrapper}>
                    <img
                      src={currentPackage.image}
                      alt="NFT_AVATAR"
                      width="120px"
                      style={{ borderRadius: 12 }}
                    />{" "}
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      textAlign="left"
                      fontWeight={600}
                      ml={2}
                      fontSize={20}
                      color={"#f9f9f9"}
                    >
                      {currentPackage.title}
                    </Typography>
                    <Typography
                      variant="h6"
                      className={classes.para}
                      textAlign="left"
                      fontWeight={400}
                      ml={2}
                      fontSize={14}
                      color={"#919191"}
                    >
                      {currentPackage.poolName}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  flexDirection="column"
                  alignItems={"center"}
                  justifyContent="center"
                >
                  <Typography
                    variant="h6"
                    textAlign="left"
                    fontWeight={600}
                    color={"#e5e5e5"}
                    fontSize={15}
                  >
                    {currentPackage.price} {currentPackage.currency}
                  </Typography>
                  <Typography
                    variant="h6"
                    className={classes.para}
                    textAlign="left"
                    fontWeight={400}
                    fontSize={14}
                    color={theme.palette.buttonDark.bg}
                  >
                    Price
                  </Typography>
                </Box>
              </Box>
            </div>
            <Typography
              variant="h6"
              className={classes.para}
              textAlign="center"
              fontWeight={400}
              fontSize={16}
              color={"#bdbdbd"}
            >
              Available for purchase: <strong> {maxPurchase}</strong>
            </Typography>

            <Box display="flex" justifyContent={"center"} alignItems="center">
              <Box
                mt={3}
                display="flex"
                justifyContent={"space-between"}
                alignItems="center"
                style={{ width: "100%", maxWidth: 360 }}
              >
                <Box className={classes.inputWrapper}>
                  <input
                    placeholder="0.0"
                    className={classes.input}
                    inputProps={{ min: minQuantity, max: maxPurchase }}
                    fullWidth
                    style={{ color: "white", marginLeft: 20 }}
                    onChange={(e) => changeInput(e.target.value)}
                    error={error.length > 0 ? true : false}
                  />
                </Box>
                <Box style={{ width: "fit-content" }}>
                  <Button
                    style={{
                      backgroundColor: theme.palette.buttonDark.bg,
                      color: theme.palette.buttonDark.color,
                      padding: 0,
                      padding: "15px 15px 15px 15px",
                      fontSize: 12,
                      borderRadius: 15,
                      marginLeft: 10,
                      outline: "none",
                      height: 45,
                    }}
                    onClick={handleMax}
                  >
                    Max
                  </Button>
                </Box>
              </Box>
            </Box>
            {error.status ? (
              <span className={classes.error}>{error.message}</span>
            ) : (
              ""
            )}

            <div className="d-flex justify-content-center">
              <button className={classes.cancelButton} onClick={resetPopup}>
                Cancel
              </button>
              <button
                className={classes.connectButton}
                onClick={purchasePackage}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePopup;
