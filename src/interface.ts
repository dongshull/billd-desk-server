import { IUser } from '@/types/IUser';

export interface IInitUser extends IUser {
  user_roles: number[];
  devFFmpeg: boolean;
  prodFFmpeg: boolean;
  area: number[];
  devFFmpegLocalFile: string;
  prodFFmpegLocalFile: string;
}

export enum liveEnum {
  srs = 1,
  webrtc,
}

export interface IDeskConfig {
  id?: number;
  type?: number;
  field_a?: string;
  field_b?: string;
  field_c?: string;
  field_d?: string;
  field_e?: string;
  field_f?: string;
  field_g?: string;
  remark?: string;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export enum DeskConfigEnum {
  versionConfig,
}

export interface IDeskVersion {
  id?: number;
  /** 1:强制更新; 2:不强制更新 */
  force?: number;
  /** 版本 */
  version?: string;
  /** 显示版本 */
  show_version?: string;
  /** 更新内容 */
  update_content?: string;
  /** 更新日期 */
  update_date?: string;
  /** 是否禁用，1:禁用; 2:不禁用 */
  disable?: number;
  /** 禁用消息 */
  disable_msg?: number;
  download_macos_dmg?: string;
  download_windows_64_exe?: string;
  download_windows_32_exe?: string;
  download_windows_arm_exe?: string;
  download_linux_64_deb?: string;
  download_linux_64_tar?: string;
  download_linux_arm_deb?: string;
  download_linux_arm_tar?: string;
  remark?: string;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IEmail {
  id?: number;
  email?: string;
  code?: string;
  exp?: number;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IAuth {
  id?: number;
  p_id?: number;
  auth_name?: string;
  auth_value?: string;
  type?: number;
  priority?: number;
  c_auths?: number[];

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IRole {
  id?: number;
  p_id?: number;
  role_name?: string;
  role_value?: string;
  type?: number;
  priority?: number;
  role_auths?: number[];
  c_roles?: number[];

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IRoleAuth {
  id?: number;
  role_id?: number;
  auth_id?: number;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export type IListBase = {
  nowPage?: number | string;
  pageSize?: number | string;
  orderBy?: string;
  orderName?: string;
  keyWord?: string;
  childNowPage?: number | string;
  childPageSize?: number | string;
  childOrderBy?: string;
  childOrderName?: string;
  childKeyWord?: string;
  rangTimeType?: 'created_at' | 'updated_at' | 'deleted_at';
  rangTimeStart?: number | string;
  rangTimeEnd?: number | string;
};

export type IList<T> = IListBase & T;

export interface IRedisVal<T> {
  created_at: number;
  expired_at: number;
  value: T;
}

export interface IUserRole {
  id?: number;
  user_id: number;
  role_id: number;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IDayData {
  id?: number;
  day: string;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IHourData {
  id?: number;
  hour: string;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IMinuteData {
  id?: number;
  minute: string;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export enum StatusEnum {
  normal,
  disable,
}

export enum SwitchEnum {
  yes,
  no,
}

export type ILive = {
  id?: number;
  /** 直播记录id */
  live_record_id?: number;
  /** 用户id */
  user_id?: number;
  /** 直播间id */
  live_room_id?: number;
  /** 直播流名称 */
  stream_name?: string;
  /** 直播流id */
  stream_id?: string;
  /** 这次直播的标识id（用于推拉流回调） */
  flag_id?: string;
  /** 备注 */
  remark?: string;

  /** 用户信息 */
  user?: IUser;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
};

export enum ClientEnvEnum {
  android,
  ios,
  ipad,
  web,
  web_mobile,
  web_pc,
  windows,
  macos,
}
