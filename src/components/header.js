import { AppBar, Toolbar } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import React from "react";
import { clearAllToken, getJwt } from "../services/localStorageServices";

export default class Header extends React.Component{
    logout = () => {
      clearAllToken();
      window.location.href = "/";
      };
      render() {
          return (
              <AppBar position="static">

              <Toolbar>
                  <h1> {getJwt()} </h1>
                  <Button className="wcl-link" onClick={this.logout}>
                      Logout
                  </Button>
                  </Toolbar>
                  </AppBar>
          );
      }
  };
