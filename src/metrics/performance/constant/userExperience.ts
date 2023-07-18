import { getFID, getLCP, getFCP, getTTFB, getDCL, getTTI, getFP, getLOAD } from '../event/userExperienceEvent';

// 首次输入延迟
export const FID = 'FIRST_INPUT_DELAY';
// DOMContentLoaded 事件完成时间
export const DCL = 'DOM_CONTENT_LOADED';
// 可交互时间
export const TTI = 'TIME_TO_INTERACTIVE';
// 最大内容渲染时间
export const LCP = 'LARGEST_CONTENTFUL_PAINT';
// 首次内容渲染时间
export const FCP = 'FIRST_CONTENTFUL_PAINT';
// 首次绘制时间
export const FP = 'FIRST_PAINT';
// 首字节时间
export const FBT = 'TIME_TO_FIRST_BYTE';
// 累积布局偏移
export const CLS = 'CUMULATIVE_LAYOUT_SHIFT';
// 加载完成
export const LOAD = 'LOAD_SUCCESS';

export const USER_EXPERIENCE_INDEX_MAP = {
    [FID]: getFID,
    [DCL]: getDCL,
    [TTI]: getTTI,
    [LCP]: getLCP,
    [FCP]: getFCP,
    [FP]: getFP,
    [FBT]: getTTFB,
    [LOAD]: getLOAD
};
