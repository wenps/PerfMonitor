import { reportParams } from '../../../types/report';
import { getPageInfo } from './pageInfoEvent';

export function getHashRouter(fn: Function, transform: Function[], report: reportParams) {
    // 监听hash
    window.addEventListener(
        'hashchange',
        (e) => fn({ target: e, ...getRouterBaseInfo('hashchange') }, transform, report),
        true
    );
    window.addEventListener(
        'load',
        (e) => fn({ target: e, ...getRouterBaseInfo('hashchange') }, transform, report),
        true
    ); // 初始化监听
}

export function getHistoryRouter(fn: Function, transform: Function[], report: reportParams) {
    // 监听history
    window.addEventListener('popstate', (e) => {
        fn({ target: e, ...getRouterBaseInfo('popstate') }, transform, report);
    });

    const rawPushState = window.history.pushState; // 存储 pushState 原函数
    window.history.pushState = (...args) => {
        rawPushState.apply(window.history, args);
        fn({ ...getRouterBaseInfo('pushState') }, transform, report);
    };

    const rawReplaceState = window.history.replaceState; // 存储 pushState 原函数
    window.history.replaceState = (...args) => {
        rawReplaceState.apply(window.history, args);
        fn({ ...getRouterBaseInfo('replaceState') }, transform, report);
    };
    fn({ ...getRouterBaseInfo('pushState') }, transform, report); // 初始化监听
}

// 函数封装
function getRouterBaseInfo(event: string) {
    return {
        date: new Date().getTime(),
        event,
        pageInfo: getPageInfo()
    };
}
