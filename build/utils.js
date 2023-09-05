const httpsReg = /^https:\/\//;

// import fs from 'fs'
import path from 'path'
// import dotenv from 'dotenv'

/* 在node环境中（如vite.config.js文件），并不能通过import.meta.env.xxx这种方式使用环境变量，
但我们却有这样的需求，因此我们需要处理一下，让node环境也可以使用我们定义的环境变量 */
export function wrapperEnv(envOptions) {
  if (!envOptions) return {};
  const rst = {};

  for (const key in envOptions) {
    let val = envOptions[key];
    if (["true", "false"].includes(val)) {
      val = val === "true";
    }
    if (["VITE_PORT"].includes(key)) {
      val = +val;
    }
    if (key === "VITE_PROXY" && val) {
      try {
        val = JSON.parse(val.replace(/'/g, '"'));
      } catch (error) {
        val = "";
      }
    }
    rst[key] = val;
    if (typeof key === "string") {
      process.env[key] = val;
    } else if (typeof key === "object") {
      process.env[key] = JSON.stringify(val);
    }
  }
  return rst;
}

export function createProxy(list = []) {
  const rst = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsReg.test(target);
    // https://github.com/http-party/node-http-proxy#options
    rst[prefix] = {
      target: target,
      changeOrigin: true,
      // rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
    };
  }
  return rst;
}

/**
 * * 项目根路径
 * @descrition 结尾不带/
 */
export function getRootPath() {
  return path.resolve(process.cwd())
}

/**
 * * 项目src路径
 * @param srcName src目录名称(默认: "src")
 * @descrition 结尾不带斜杠
 */
export function getSrcPath(srcName = 'src') {
  return path.resolve(getRootPath(), srcName)
}