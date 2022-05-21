import { ThemeContext } from "grommet";
import React, { Component } from "react";
import { grommet } from "grommet";
import { ImArrowRight, ImArrowLeft } from "react-icons/im";
const SiteThemeContext = {
  global: {
    hover: {
      background: "rgba(32,188,255,1)",
      color: "white",
    },
    background: {
      color: "pink",
    },
    colors: {
      brand:
        "linear-gradient(90deg, rgba(84,106,255,1) 0%, rgba(32,188,255,1) 100%)",
      focus:
        "linear-gradient(90deg, rgba(84,106,255,1) 0%, rgba(32,188,255,1) 100%)",
      active:
        "linear-gradient(90deg, rgba(84,106,255,1) 0%, rgba(32,188,255,1) 100%)",
      selected:
        "linear-gradient(90deg, rgba(84,106,255,1) 0%, rgba(32,188,255,1) 100%)",
      gblue:
        "linear-gradient(90deg, rgba(84,106,255,1) 0%, rgba(32,188,255,1) 100%)",
    },
    drop: {},
  },
  button: {
    active: {
      background: {
        color: "rgba(32,188,255,1)",
      },
    },
  },
  select: {},
  calendar: {
    icons: {
      //next: ImArrowRight,
      //previous:ImArrowLeft
    },
    day: {
      extend: {},
    },
  },
};

export { SiteThemeContext };
