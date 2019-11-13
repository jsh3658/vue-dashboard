import format from 'date-fns/format';

const dateFormat = 'YYYY-MM-DD';
const dateFormat2 = 'YYYY-MM-DD hh:mm:ss';
const dateFormat3 = 'HH:mm:ss';

const dateConfig = (day) => {
    let date = new Date();
    return date.setDate(date.getDate() + day);
};

const dateTimeConfig = (day) => {
    let date = new Date();
    return date.setHours(date.getHours() + day);
};

export default {
    UTC: new Date().toISOString().substring(0, 19).replace('T', '\n'), // 오늘 UTC시간,
    KST: format(dateConfig(0), dateFormat2), // 오늘 KST시간
    ThreeMonthsAgo: format(dateConfig(-90), dateFormat), // 세달 전
    TwoMonthsAgo: format(dateConfig(-60), dateFormat), // 두달 전
    AMonthAgo: format(dateConfig(-30), dateFormat), // 한달 전
    FifteenAgo: format(dateConfig(-15), dateFormat), // 보름 전
    TwoWeekAgo: format(dateConfig(-14), dateFormat), // 이주일 전
    AWeekAgo: format(dateConfig(-7), dateFormat), // 일주일 전
    AnHourAgo: format(dateTimeConfig(-1), dateFormat), // 1시간 전
    Yesterday: format(dateConfig(-1), dateFormat), // 어제
    Today: format(dateConfig(0), dateFormat), // 오늘
    Tomorrow: format(dateConfig(1), dateFormat), // 내일
    OneHour: format(dateTimeConfig(-1), dateFormat3),
    TodayHour : format(dateConfig(0), dateFormat3)
}

