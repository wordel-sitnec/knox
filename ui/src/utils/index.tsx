// @ts-nocheck
import React from "react";
import AES from "crypto-js/aes";
import CryptoJS from "crypto-js";

// for cleaning up provider handling
export const ComposeComponents = ({ components = [], children = <></> }) => {
  return components.reverse().reduce((child, Component) => {
    return <Component>{child}</Component>;
  }, children);
};

// get secret from session storage
export const getSecret = () => {
  return window.sessionStorage.getItem("secret");
};

// set secret to session storage
export const storeSecret = (secret) => {
  window.sessionStorage.setItem("secret", secret);
};

// for encrypting a value before sending to knox
export const aesEncrypt = (string, secret) => {
  if (!string || !secret) return;
  const encrypted = AES.encrypt(string, secret);
  return encrypted.toString();
};

// for decrypting a value received from knox
export const aesDecrypt = (string, secret) => {
  if (!string || !secret) return;
  const decrypted = AES.decrypt(string, secret).toString(CryptoJS.enc.Utf8);
  return decrypted;
};
