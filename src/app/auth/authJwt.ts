import jwt from 'jsonwebtoken';

import { COMMON_ERROE_MSG, COMMON_HTTP_CODE } from '@/constant';
import { JWT_SECRET } from '@/secret/secret';
import { IUser } from '@/types/IUser';

/**
 * 验证jwt
 */
export const jwtVerify = (token: string) => {
  return new Promise<{
    code: number;
    errorCode?: number;
    msg: string;
    userInfo?: IUser;
  }>((resolve) => {
    jwt.verify(token, JWT_SECRET, (err) => {
      // 判断非法/过期token
      if (err) {
        let msg = err.message;
        if (err.message.indexOf('expired') !== -1) {
          msg = COMMON_ERROE_MSG.jwtExpired;
        }
        if (err.message.indexOf('invalid') !== -1) {
          msg = COMMON_ERROE_MSG.invalidToken;
        }
        resolve({ code: COMMON_HTTP_CODE.unauthorized, msg });
        return;
      }
      function main() {
        try {
          resolve({
            code: COMMON_HTTP_CODE.success,
            msg: '',
          });
        } catch (error: any) {
          resolve({ code: COMMON_HTTP_CODE.paramsError, msg: error });
        }
      }
      // 如果token正确，解密token获取用户id，根据id查数据库的token判断是否一致。
      main();
    });
  });
};

/**
 * 自动验证jwt
 */
export const authJwt = async (ctx) => {
  // 首先判断请求头有没有authorization
  if (ctx.req.headers.authorization === undefined) {
    return { code: COMMON_HTTP_CODE.unauthorized, msg: '未登录！' };
  }

  const token = ctx.req.headers.authorization?.split(' ')[1];
  const res = await jwtVerify(token);
  return res;
};

/**
 * 生成jwt，exp单位：小时
 */
export const signJwt = (value: { userInfo: IUser; exp: number }): string => {
  const userInfo = {
    id: value.userInfo.id,
    username: value.userInfo.username,
    avatar: value.userInfo.avatar,
  };
  const res = jwt.sign(
    { userInfo, exp: Math.floor(Date.now() / 1000) + 60 * 60 * value.exp },
    JWT_SECRET
  );
  return res;
};
