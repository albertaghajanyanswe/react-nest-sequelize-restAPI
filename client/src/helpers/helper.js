import moment from "moment";
import i18n from "../i18n";

const getMessage = (error, variant = "success") => {
  let message = '';
  if (variant === 'error') {
    message = i18n.t("actionMsg.error.unknownError")
  } else {
    message = i18n.t("actionMsg.success.operationSucceeded")
  }
  if (error && error.message) {
    message = error.message
  }
  if (error && error.error) {
    message = error.error
  }
  if (error && error?.response && error?.response?.data) {
    message = error?.response?.data?.message
  }
  if (error && error?.data && error?.data?.message) {
    message = error?.data?.message
  }
  return message;
};

const getMessageV1 = (error, variant = "success") => {
  const message =
    error && error.message
      ? error.message
      : error && error.error
      ? error.error
      : variant === "error"
      ? i18n.t("actionMsg.error.unknownError")
      : i18n.t("actionMsg.success.operationSucceeded");
  console.log("message = ", message);
  return message;
};

const deleteAllSpacesFromStr = (str) => str.replace(/\s/g, "");

const dateFormat = (date, format = "YYYY-MM-DDTHH:mm") =>
  moment(date).format(format);

function stringAvatar(name, w, h) {
  return {
    sx: {
      // bgcolor: stringToColor(name),
      width: w || 32,
      height: h || 32,
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export { getMessage, getMessageV1, deleteAllSpacesFromStr, dateFormat, stringAvatar, isJsonString };
