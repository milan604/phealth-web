
import { message } from 'antd';


export const success = ( sucessMessage ) => {
  message.success(sucessMessage, 5);
};

export const error = ( errorMessage ) => {
  message.error(errorMessage, 5);
};


export const info = ( infoMessage ) => {
  message.info( infoMessage, 5);
};

export const warning = ( warningMessage ) => {
  message.warning(warningMessage, 5);
};
