import { getRT, getDNS, getTCP, getTTFB, getREQ, getDOM, getRES, getTOTAL, getUPLOAD, getRESARR } from '../uitls/performanceEvent';

const RT = 'REDIRECT_TIME';
const TCP = 'TCP_TIME';
const TTFB = 'RESPONSE_TIME';
const REQ = 'REQUEST_TIME';
const DOM = 'DOM_PARSE_TIME';
const RES = 'RESOURCE_LOAD_TIME';
const TOTAL = 'TOTAL_TIME';
const UPLOAD = 'UNLOAD_TIME';
const DNS = 'DNS_TIME';
const RESARR = 'RESOURCE_ARR'

const PERFORMANCE_INDEX_MAP = {
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

export default {
    RT,
    TCP,
    TTFB,
    REQ,
    DOM,
    RES,
    TOTAL,
    UPLOAD,
    DNS,
    RESARR,
    PERFORMANCE_INDEX_MAP
};
