import { HttpConfig } from '../configs/HttpConfig';

export const createImgPath = (serverPath: string) => {
  if (serverPath) {
    return HttpConfig.serverAdress + serverPath.replace(/\\/g, '/');
  }

  return '';
};
