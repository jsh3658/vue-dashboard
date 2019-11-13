import * as GNB from '@/common/navigation.js';

export default function(){
    let gnb = [];


    GNB.navi.forEach(e => {
        gnb.push(e);
    });

    // sorting
    gnb.sort((x, y) => {
        return x.idx - y.idx
    });

    return gnb;
}

