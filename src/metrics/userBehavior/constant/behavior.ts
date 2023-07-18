import { getClickInfo, getInputInfo } from "../event/tagEvent";
import { getHashRouter, getHistoryRouter } from "../event/routerEvent";
import { getHttpFetchInfo } from "../event/httpEvent";
import { getPageInfo } from "../event/pageInfoEvent";
import { getUserAgentInfo } from "../event/userAgentEvent";

// 路由上报
export const HASH = 'HASH_ROUTER'
export const HISTORY = 'HISTORY_ROUTER'

export const ROUTER_EVENT_MAP = {
    [HASH]: getHashRouter,
    [HISTORY]: getHistoryRouter
}

// 标签上报
export const CLICK = 'CLICK_EVENT'
export const INPUT = 'INPUT_EVENT'

export const TAG_EVENT_MAP = {
    [CLICK]: getClickInfo,
    [INPUT]: getInputInfo
}

// https上报
export const FETCH = 'FETCH_EVENT'

export const HTTP_EVENT_MAP = {
    [FETCH]: getHttpFetchInfo,
}

export const GET_PAGE_INFO = getPageInfo
export const GET_USER_AGENT_INFO = getUserAgentInfo

