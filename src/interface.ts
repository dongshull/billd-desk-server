import { IUser } from '@/types/IUser';

export interface IInitUser extends IUser {
  user_roles: number[];
  area: number[];
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
  /** macos 32位ARM */
  download_macos_arm_dmg?: string;
  /** macos 64位ARM */
  download_macos_arm64_dmg?: string;
  /** macos 64位X86，X86是x86_64 或 amd64的别名  */
  download_macos_x64_dmg?: string;
  /** windows 32位ARM */
  download_windows_arm_exe?: string;
  /** windows 64位ARM */
  download_windows_arm64_exe?: string;
  /** windows 64位X86，X86是x86_64 或 amd64的别名 */
  download_windows_x64_exe?: string;
  /** linux 32位ARM */
  download_linux_arm_appimage?: string;
  /** linux 64位ARM */
  download_linux_arm64_appimage?: string;
  /** linux 64位X86，X86是x86_64 或 amd64的别名 */
  download_linux_x64_appimage?: string;
  /** linux deb 32位ARM */
  download_linux_arm_deb?: string;
  /** linux deb 64位ARM */
  download_linux_arm64_deb?: string;
  /** linux deb 64位X86，X86是x86_64 或 amd64的别名 */
  download_linux_x64_deb?: string;
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
