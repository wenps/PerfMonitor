// 旧版本性能指标
const originTiming = performance.timing;
// 新版本性能指标
const currentTiming = performance.getEntriesByType('navigation');

export function getTiming() {
    return currentTiming.length ? currentTiming[0]:originTiming
}
