import GNB from '@/common/naviScope';

let rootPath = GNB()[0].path;
export const root = [
    { path: '/' , redirect: rootPath }
];