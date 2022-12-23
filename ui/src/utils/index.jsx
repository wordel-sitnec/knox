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

// TODO: replace math.floors/math.random with get ent from urbit
String.prototype.pick = function (min, max) {
  let n,
    chars = "";

  if (typeof max === "undefined") {
    n = min;
  } else {
    n = min + Math.floor(Math.random() * (max - min + 1));
  }

  for (let i = 0; i < n; i++) {
    chars += this.charAt(Math.floor(Math.random() * this.length));
  }

  return chars;
};

String.prototype.shuffle = function () {
  let array = this.split("");
  let tmp,
    current,
    top = array.length;

  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }

  return array.join("");
};

// for creating a password
export const generatePassword = () => {
  let specials = "!@#$%^&*()_+{}:\"<>?|[];',./`~";
  let lowercase = "abcdefghijklmnopqrstuvwxyz";
  let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let numbers = "0123456789";

  let all = specials + lowercase + uppercase + numbers;

  let password = "";
  password += specials.pick(1);
  password += lowercase.pick(1);
  password += uppercase.pick(1);
  password += numbers.pick(1);
  password += all.pick(4, 12);
  password = password.shuffle();
  return password;
};
