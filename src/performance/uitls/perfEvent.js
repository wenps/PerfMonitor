import { getTiming } from '../../utils/getPerformance';
const timing = getTiming();

export async function getTTFB() { // 从资源的请求到响应第一个字节的时间跨度
    return timing.responseStart - timing.navigationStart;
}

export async function getFP() { // 白屏时间
    const FP = performance.getEntries('paint').filter((entry) => entry.name == 'first-paint')[0].startTime;
    return FP;
}

export async function getFCP() { // 首次内容绘制
    const FCP = performance.getEntries('paint').filter((entry) => entry.name == 'first-contentful-paint')[0].startTime;
    return FCP;
}

export function getLCP() { // 最大内容渲染时间
    return new Promise((resolve, reject) => {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            resolve(entries[entries.length - 1]?.startTime);
        }).observe({ type: 'largest-contentful-paint', buffered: true });
    });
}

export async function getTTI() { // 最早可交互时间，以第一个长任务暂代
    return new Promise((resolve, reject) => {
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                resolve(entry.startTime);
            }
        }).observe({ entryTypes: ['longtask'] });
    });
}

export function getDCL() { // 当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded事件被触发，而无需等待样式表、图像和子框架的完全加载。
    return new Promise((resolve, reject) => {
        document.addeventListener('DOMContentLoaded', function() { 
            resolve(+new Date() - timing.navigationStart)
         }, false);
    })
}

export function getFID() { //用户第一次与页面交互，直到浏览器对交互作出响应，并实际能够开始处理事件处理程序所经过的时间。
    return new Promise((resolve, reject) => {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const entry = entries[entries.length - 1];
            const delay = entry.processingStart - entry.startTime;
            resolve(delay);
        }).observe({ type: 'first-input', buffered: true });
    })
}