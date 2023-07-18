import { getRT, getDNS, getTCP, getTTFB, getREQ, getDOM, getRES, getTOTAL, getUPLOAD, getRESARR } from '../event/performanceEvent';

export const RT = 'REDIRECT_TIME';
export const TCP = 'TCP_TIME';
export const TTFB = 'RESPONSE_TIME';
export const REQ = 'REQUEST_TIME';
export const DOM = 'DOM_PARSE_TIME';
export const RES = 'RESOURCE_LOAD_TIME';
export const TOTAL = 'TOTAL_TIME';
export const UPLOAD = 'UNLOAD_TIME';
export const DNS = 'DNS_TIME';
export const RESARR = 'RESOURCE_ARR'

export const PERFORMANCE_INDEX_MAP = {
    [RT]: getRT,
    [TCP]: getTCP,
    [TTFB]: getTTFB,
    [REQ]: getREQ,
    [DOM]: getDOM,
    [RES]: getRES,
    [TOTAL]: getTOTAL,
    [UPLOAD]: getUPLOAD,
    [DNS]: getDNS,
    [RESARR]: getRESARR, 
};
