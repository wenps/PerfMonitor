import { NAVIGATION_TYPE } from "../../../constant/navigation";

export function getPageInfo() { // 页面基础信息
    const { host, hostname, href, protocol, origin, port, pathname, search, hash } = window.location;
    const { width, height } = window.screen;
    const { language, userAgent } = navigator;
    const referrer = document.referrer
    const enterType = window.performance?.navigation?.type || 501
  
    return {
      host,
      hostname,
      href,
      protocol,
      origin,
      port,
      pathname,
      search,
      hash,
      title: document.title,
      language: language.substr(0, 2),
      userAgent,
      referrer,
      enterType: NAVIGATION_TYPE[enterType],
      winScreen: `${width}x${height}`,
      docScreen: `${document.documentElement.clientWidth || document.body.clientWidth}x${
        document.documentElement.clientHeight || document.body.clientHeight
      }`,
    };
  }
  