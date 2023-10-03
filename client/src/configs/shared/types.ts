import React from "react";

export interface IUser {
  id: number;
  name: string;
  email: string;
}

export type iLogin = {
  email: string;
  password: string;
}

export type iLoginGuest = {
  nickName: string;
  password: string;
}

export type iRegistration = {
  firstName: string;
  lastName: string;
  email: string;
  nickName: string;
  password: string;
  phone: string;
  switchGuestAccount: boolean;
}

export type iRegistrationGuest = {
  nickName: string;
  password: string;
}

export type iInput = {
  id: string,
  name: string,
  label: string,
  type: string,
  variant: string,
  icon: React.ReactNode,
}

export type iInputs = {
  inputs: iInput[]
}