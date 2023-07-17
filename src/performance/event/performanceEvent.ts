import { deV } from '../../utils/formatConversion';
import { getTiming } from '../../utils/getPerformance';
const timing: any = getTiming();

const getRT = async () => {
    // 重定向 耗时
    return timing.redirectEnd - timing.redirectStart;
};

const getDNS = async () => {
    // DNS 耗时
    return timing.domainLookupEnd - timing.domainLookupStart;
};

const getTCP = async () => {
    // TCP 耗时
    return timing.connectEnd - timing.connectStart;
};

const getTTFB = async () => {
    // 响应 耗时
    return timing.responseStart - timing.requestStart;
};

const getREQ = async () => {
    // 请求耗时
    return timing.responseEnd - timing.responseStart;
};

const getDOM = async () => {
    // DOM 解析 耗时
    return timing.domInteractive - timing.responseEnd;
};

const getRES = async () => {
    // 资源加载 耗时
    return timing.loadEventStart - timing.domContentLoadedEventEnd;
};

const getTOTAL = async () => {
    // 总耗时
    return (
        (timing.loadEventEnd || timing.loadEventStart || timing.domComplete || timing.domLoading) -
        timing.navigationStart
    );
};

const getUPLOAD = async () => {
    // 卸载耗时
    return timing.unloadEventEnd - timing.navigationStart;
};

const getRESARR = () => {
    // 静态资源
    return new Promise((resolve, reject) => {
        const resource = performance.getEntriesByType('resource');
        let cacheHit = 0
        const formatResourceArray = resource.map((item:any) => {
            if (item.duration == 0 && item.transferSize !== 0) cacheHit++;
            return {
                startTime: item.startTime, //开始
                EndTime: item.responseEnd, //结束
                useTime: item.duration, //消耗
                path: item.name, //资源地址
                resourceType: item.initiatorType, //资源类型
                transferSize: item.transferSize, //传输大小
                requestTime: deV(item, ['responseStart'], 0) - deV(item, ['startTime'], 0), // 请求时长
                loadTime: deV(item, ['responseEnd'], 0) - deV(item, ['responseStart'], 0) // 加载时长
            };
        });
        resolve({formatResourceArray, cacheHit: (cacheHit / resource.length).toFixed(2) });
    });
};

export { getRT, getDNS, getTCP, getTTFB, getREQ, getDOM, getRES, getTOTAL, getUPLOAD, getRESARR };
