// eslint-disable-next-line
import './alias';
import './initFile';

import { dockerRunMysql } from '@/init/docker/Mysql';
import { dockerRunRedis } from '@/init/docker/Redis';
import { dockerIsInstalled } from '@/utils';
import { chalkERROR, chalkSUCCESS } from '@/utils/chalkTip';

const flag = dockerIsInstalled();
if (flag) {
  console.log(chalkSUCCESS('docker已安装'));
  dockerRunMysql(true);
  dockerRunRedis(true);
} else {
  console.log(chalkERROR('未安装docker！'));
}
