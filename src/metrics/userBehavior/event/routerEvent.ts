import { reportParams } from '../../../types/report';
import { getPageInfo } from './pageInfoEvent';

export function getHashRouter(fn: Function, transform: Function[], report: reportParams, commandReportTypes:string[]) {
    // 监听hash
    window.addEventListener(
        'hashchange',
        (e) => fn({ target: e, ...getRouterBaseInfo('hashchange') }, transform, report, commandReportTypes),
        true
    );
    window.addEventListener(
        'load',
        (e) => fn({ target: e, ...getRouterBaseInfo('hashchange') }, transform, report, commandReportTypes),
        true
    ); // 初始化监听
}

export function getHistoryRouter(fn: Function, transform: Function[], report: reportParams, commandReportTypes:string[]) {
    // 监听history
    window.addEventListener('popstate', (e) => {
        fn({ target: e, ...getRouterBaseInfo('popstate') }, transform, report, commandReportTypes);
    });

    const rawPushState = window.history.pushState; // 存储 pushState 原函数
    window.history.pushState = (...args) => {
        rawPushState.apply(window.history, args);
        fn({ ...getRouterBaseInfo('pushState') }, transform, report, commandReportTypes);
    };

    const rawReplaceState = window.history.replaceState; // 存储 pushState 原函数
    window.history.replaceState = (...args) => {
        rawReplaceState.apply(window.history, args);
        fn({ ...getRouterBaseInfo('replaceState') }, transform, report, commandReportTypes);
    };
    fn({ ...getRouterBaseInfo('pushState') }, transform, report, commandReportTypes); // 初始化监听
}

// 函数封装
function getRouterBaseInfo(event: string) {
    return {
        date: new Date().getTime(),
        event,
        pageInfo: getPageInfo()
    };
}
