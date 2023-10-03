import moment from "moment";
import i18n from "../i18n";

const getMessage = (error, variant = "success") => {
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

export { getMessage, deleteAllSpacesFromStr, dateFormat };
