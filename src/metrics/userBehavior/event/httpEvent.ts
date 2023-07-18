import { reportParams } from "../../../interfaces/report"

export function getHttpFetchInfo(fn:Function, transform: Function[], report: reportParams) {
    // 劫持fetch
    if (window['fetch'] && typeof window.fetch === 'function') {
        const cpFetch = window.fetch  // 暂存window的fetch
        // 
        window.fetch = async (url: any, params: any) => { 

          let fetchIndex:object = {
            url: url || '',
            method: params?.method || '',
            body: params?.body || '',
            requestTime: new Date().getTime()
          }
    
          return cpFetch.apply(window, [url, params]).then(async (res) => {
            const data = res.clone(); // 响应体只能被读取一次，clone创建副本
            
            fetchIndex = {
              ...fetchIndex,
              code: data.status,
              response: await data.text(),
              responseTime: new Date().getTime(),
            };

            // 上报请求相关内容
            fn(fetchIndex, transform, report)
            return res;
          });
        };
    }
}
