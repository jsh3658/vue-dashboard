import getAsyncCall from '@/common/api';
import state from '@/store/state/state.js';

const dashBoard = args => {
    return new Promise(resolve => {
        getAsyncCall(args.TYPE, args.URL)
            .then(res => {
                state.error = false; // 이전 페이지에서 에러가 발생한 것을 다시 에러가 나지 않았다고 표시해줌

                state.dataSets.contents = res.data.result.contents || res.data.result.content;
                state.dataSets.totalSize = res.data.result.totalSize || 0;

                resolve(state.dataSets);
            })
            .catch(err => {
                state.error = err.message;
                console.log(err);
            });
    });
};

export default dashBoard;