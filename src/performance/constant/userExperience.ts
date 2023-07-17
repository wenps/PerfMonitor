import { getFID, getLCP, getFCP, getTTFB, getDCL, getTTI, getFP, getLOAD } from '../uitls/userExperienceEvent';

// 首次输入延迟
const FID = 'FIRST_INPUT_DELAY';
// DOMContentLoaded 事件完成时间
const DCL = 'DOM_CONTENT_LOADED';
// 可交互时间
const TTI = 'TIME_TO_INTERACTIVE';
// 最大内容渲染时间
const LCP = 'LARGEST_CONTENTFUL_PAINT';
// 首次内容渲染时间
const FCP = 'FIRST_CONTENTFUL_PAINT';
// 首次绘制时间
const FP = 'FIRST_PAINT';
// 首字节时间
const TTFB = 'TIME_TO_FIRST_BYTE';
// 累积布局偏移
const CLS = 'CUMULATIVE_LAYOUT_SHIFT';
// 加载完成
const LOAD = 'LOAD_SUCCESS';

const USER_EXPERIENCE_INDEX_MAP = {
    [FID]: getFID,
    [DCL]: getDCL,
    [TTI]: getTTI,
    [LCP]: getLCP,
    [FCP]: getFCP,
    [FP]: getFP,
    [TTFB]: getTTFB,
    [LOAD]: getLOAD
};

export default {
    FID,
    DCL,
    TTI,
    LCP,
    FCP,
    FP,
    TTFB,
    CLS,
    LOAD,
    USER_EXPERIENCE_INDEX_MAP
};
