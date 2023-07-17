import { getTiming } from '../../utils/getPerformance';
const timing:any = getTiming();

async function getTTFB() { // 从资源的请求到响应第一个字节的时间跨度
    return timing.responseStart - timing.navigationStart;
}

async function getFP() { // 白屏时间
    const FP = performance.getEntries().filter((entry) => entry.name == 'first-paint')[0].startTime;
    return FP;
}

async function getFCP() { // 首次内容绘制
    const FCP = performance.getEntries().filter((entry) => entry.name == 'first-contentful-paint')[0].startTime;
    return FCP;
}

function getLCP() { // 最大内容渲染时间
    return new Promise((resolve, reject) => {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            resolve(entries[entries.length - 1]?.startTime);
        }).observe({ type: 'largest-contentful-paint', buffered: true });
    });
}

async function getTTI() { // 最早可交互时间，以第一个长任务暂代
    return new Promise((resolve, reject) => {
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                resolve(entry.startTime);
            }
        }).observe({ entryTypes: ['longtask'] });
    });
}

function getDCL() { // 当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded事件被触发，而无需等待样式表、图像和子框架的完全加载。
    return new Promise((resolve, reject) => {
        document.addEventListener('DOMContentLoaded', function() { 
            resolve(+new Date() - timing.navigationStart)
         }, false);
    })
}

function getFID() { //用户第一次与页面交互，直到浏览器对交互作出响应，并实际能够开始处理事件处理程序所经过的时间。
    return new Promise((resolve, reject) => {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const entry:any = entries[entries.length - 1];
            const delay = entry.processingStart - entry.startTime;
            resolve(delay);
        }).observe({ type: 'first-input', buffered: true });
    })
}

// TODO 基于MutationObserver 实现更精准的首屏时间获取
// TODO CLS 布局偏移计算

export {
    getFID,
    getTTFB,
    getFP,
    getFCP,
    getLCP,
    getDCL,
    getTTI,
}