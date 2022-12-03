// @ts-nocheck
import React from "react";
import bcrypt from "bcryptjs";

const saltRounds = 10;

export const ComposeComponents = ({ components = [], children = <></> }) => {
  return components.reverse().reduce((child, Component) => {
    return <Component>{child}</Component>;
  }, children);
};

export const getHash = (value) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(value, salt);
  return hash;
};
