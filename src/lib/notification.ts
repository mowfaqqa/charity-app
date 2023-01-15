import { toast } from "react-toastify";

const { error, success, warn, info } = toast;

export const notifyError = (response: any) =>
  response ? error(`${response}`) : "";
export const notifySuccess = (response: any) =>
  response ? success(`${response}`) : "";
export const notifyWarning = (response: any) =>
  response ? warn(`${response}`) : "";
export const notifyInfo = (response: any) =>
  response ? info(`${response}`) : "";
