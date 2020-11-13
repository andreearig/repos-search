import React from "react";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./themes.js";

import GithubSearch from "./elem/components/SearchGithubUser";
import "./elem/styles/styles.scss";

import Button from "@material-ui/core/Button";

const App = () => {
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <div className="app">
        <header>
          <form id="git-form">
            <GithubSearch />
            <Button
              onClick={() => themeToggler()}
              variant="outlined"
              color="secondary"
            >
              Change Theme
            </Button>
          </form>
        </header>
      </div>
    </ThemeProvider>
  );
};

export default App;
