import { error } from "./Notification";

export function getErrorMessages(errors) {
  Object.entries(errors).map(([key,values]) => {
    values.map(function (err) {
      error(err || "Something went wrong. Please try again");
    });
  });
}
