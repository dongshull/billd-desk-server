// WARN 该文件只是方便我将当前项目同步到开源仓库，其他人不需要管这个文件~

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

import trash from 'trash';

let allFile = [];
const proDir =
  '/Users/huangshuisheng/Desktop/hss/billd-project/billd-desk-server-pro';
const freeDir =
  '/Users/huangshuisheng/Desktop/hss/galaxy-s10/billd-desk-server';
const ignoreRootDir = ['.DS_Store', '.git', 'node_modules', 'dist'];
const ignoreIndexOf = [
  path.resolve(proDir, 'deploy/docker'),
  path.resolve(proDir, 'deploy/nginx'),
  path.resolve(proDir, 'deploy/handleSyncPublic.mjs'),
  path.resolve(proDir, 'src/config'),
  path.resolve(proDir, 'src/controller'),
  path.resolve(proDir, 'src/model'),
  path.resolve(proDir, 'src/secret'),
  path.resolve(proDir, 'src/service'),
  path.resolve(proDir, 'src/types'),
  path.resolve(proDir, 'src/utils'),
];

const dir = fs.readdirSync(proDir).filter((item) => {
  if (ignoreRootDir.includes(item)) {
    return false;
  }
  return true;
});

function findFile(inputDir) {
  for (let i = 0; i < inputDir.length; i += 1) {
    const file = inputDir[i];
    const filePath = `${proDir}/${file}`;
    const stat = fs.statSync(filePath);
    const isDir = stat.isDirectory();
    if (!isDir) {
      allFile.push(filePath);
    } else {
      findFile(fs.readdirSync(filePath).map((key) => `${file}/${key}`));
    }
  }
}

function putFile() {
  for (let i = 0; i < allFile.length; i += 1) {
    const file = allFile[i];
    const arr = [];
    const githubFile = file.replace(proDir, '');
    const githubFileArr = githubFile.split('/').filter((item) => item !== '');
    githubFileArr.forEach((item) => {
      if (arr.length) {
        arr.push(path.resolve(arr[arr.length - 1], item));
      } else {
        arr.push(path.resolve(freeDir, item));
      }
    });
    arr.forEach((item, index) => {
      // 数组的最后一个一定是文件，因此不需要判断它是不是目录
      if (index !== arr.length - 1) {
        const flag = fs.existsSync(item);

        !flag && fs.mkdirSync(item);
      }
    });
    fs.copyFileSync(file, path.join(freeDir, './', file.replace(proDir, '')));
  }
}

async function clearOld() {
  const freeDirAllFile = fs.readdirSync(freeDir);
  const queue = [];
  freeDirAllFile.forEach((url) => {
    const fullurl = `${freeDir}/${url}`;
    if (!['node_modules', '.git'].includes(url)) {
      queue.push(trash(fullurl));
    }
  });
  await Promise.all(queue);
}

if (process.cwd().indexOf('galaxy-s10') !== -1) {
  console.log('当前目录错误');
} else {
  clearOld().then(() => {
    findFile(dir);
    allFile = allFile.filter((x) => {
      let flag = true;
      ignoreIndexOf.forEach((y) => {
        if (x.indexOf(y) === 0) {
          flag = false;
        }
      });
      return flag;
    });
    putFile();

    const proPkgStr = fs.readFileSync(
      path.resolve(proDir, 'package.json'),
      'utf-8'
    );
    const proPkg = JSON.parse(proPkgStr);
    delete proPkg.private;
    proPkg.name = 'billd-desk';
    proPkg.repository.url = 'https://github.com/galaxy-s10/billd-desk';
    proPkg.bugs.url = 'https://github.com/galaxy-s10/billd-desk/issues';
    // proPkg.devDependencies = {};
    proPkg.dependencies = {};
    proPkg.config = {};
    fs.writeFileSync(
      path.resolve(freeDir, 'package.json'),
      // @ts-ignore
      JSON.stringify({ ...proPkg }, {}, 2)
    );
    console.log(path.resolve(freeDir, 'deploy/deploy.json'), '3333');
    fs.writeFileSync(
      path.resolve(freeDir, 'deploy/deploy.json'),
      // @ts-ignore
      JSON.stringify({
        name: proPkg.name,
        version: proPkg.version,
        buildDate: new Date().toLocaleString(),
      })
    );
    // execSync(`pnpm i`, { cwd: freeDir });
    execSync(`git rm -r --cached .`, { cwd: freeDir });
    execSync(`git add .`, { cwd: freeDir });
    execSync(`git commit -m 'feat: 优化-${new Date().toLocaleString()}'`, {
      cwd: freeDir,
    });
    execSync(`git push`, { cwd: freeDir });
  });
}
