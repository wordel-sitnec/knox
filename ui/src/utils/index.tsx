// @ts-nocheck
import React from "react";

export const ComposeComponents = ({ components = [], children = <></> }) => {
  return components.reverse().reduce((child, Component) => {
    return <Component>{child}</Component>;
  }, children);
};
