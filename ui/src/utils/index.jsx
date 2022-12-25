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

// TODO: this works but is it actually good? I think no
String.prototype.pick = function (eny, min, max) {
  let n,
    chars = "";

  if (typeof max === "undefined") {
    n = min;
  } else {
    n = min + Math.floor(Math.random() * (max - min + 1));
  }

  for (let i = 0; i < n; i++) {
    // chars += this.charAt(Math.floor(Math.random() * this.length));
    chars += this.charAt(Math.floor(parseFloat(eny[i] / 10) * this.length));
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
export const generatePassword = (enty) => {
  let entyArr = [];
  const stringArr = enty.toString().split("");

  const getNonZero = (arr, i) => {
    if (parseInt(arr[i]) === undefined) return parseInt(getNonZero(arr, 0));
    return parseInt(arr[i]) === 0
      ? parseInt(getNonZero(arr, i + 1))
      : parseInt(arr[i]);
  };

  stringArr.forEach((enty, i) => {
    entyArr.push(getNonZero(stringArr, i));
  });

  let specials = "!@#$%^&*()_+{}:\"<>?|[];',./`~";
  let lowercase = "abcdefghijklmnopqrstuvwxyz";
  let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let numbers = "0123456789";

  let all = specials + lowercase + uppercase + numbers;

  let password = "";
  password += specials.pick(entyArr.join("").shuffle(), 1);
  password += lowercase.pick(entyArr.join("").shuffle(), 1);
  password += uppercase.pick(entyArr.join("").shuffle(), 1);
  password += numbers.pick(entyArr.join("").shuffle(), 1);
  password += all.pick(entyArr.join(""), 4, 12);
  password = password.shuffle();
  return password;
};
