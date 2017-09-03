import React from 'react';

/**
 * @return {string}
 */
const ChineseDateString = (date) => ` ${date.getFullYear()} 年 ${date.getMonth() + 1} 月 ${date.getDate()} 日`;

/**
 * @return {string}
 */
const HongKongDollars = (price) => `港幣${ChineseDollarString(price)}（HKD ${price.toLocaleString('en-HK', { minimumFractionDigits: 2 })}）`;

/**
 * @return {string}
 */
const HongKongDollarsPreventLineBreak = (price) => (
    <span>
        <span style={{display: 'inline-block'}}>港幣{ChineseDollarString(price)}</span>
        <span style={{display: 'inline-block'}}>（HKD <code>${price.toLocaleString('en-HK', { minimumFractionDigits: 2 })}</code>）</span>
    </span>
);

/**
 * @return {string}
 */
const ChineseStrictNumber = (number) => {
    const digits = ['零', '壹', '貳', '叁', '肆', '伍', '陸', '柒', '捌', '玖'];
    const localExponent = ['', '拾', '佰', '仟'];
    const globalExponent = ['', '萬', '億', '兆', '京', '垓', '秭', '穰', '溝', '澗', '正', '載'];
    if (number >= 0 && number < 10) return digits[number];
    let arr = String(number).split('').map((e) => digits[e]).reverse().map((e, i) => e !== '零' ? `${e}${localExponent[i%4]}` : e);
    for (let i = 0; i < arr.length; i+=4) arr[i] += globalExponent[i/4];
    let ret = arr.reverse().join('').replace(/零+(?=[萬億兆京垓秭穰溝澗正載])/,'').replace(/零{2,}/,'零');
    if (ret.substr(0,2) === '壹拾') ret = ret.substr(2);
    if (ret.charAt(ret.length - 1) === '零') ret = ret.substr(0, ret.length - 1);
    return ret;
};

/**
 * @return {string}
 */
const ChineseDollarString = (price, intPadEndChar) => {
    intPadEndChar = intPadEndChar || '正';
    if (price * 1000 !== parseInt(price * 1000, 10)) console.warn(`屌你咩，「${price * 1000 % 1} 文」，點譯？`);
    const sec = String(price).split('.');
    sec[0] = ChineseStrictNumber(sec[0]);
    sec.length > 1 && sec[1].split('').map((e, i) => sec[i + 1] = ChineseStrictNumber(e));
    const ret = sec.map((e, i) => i < 4 ? `${e}${['圓','毫','仙','分'][i]}` : '');
    ret.length === 1 && (ret[1] = intPadEndChar);
    return ret.join('');
};

/**
 * @return {string}
 */
const ArabicDollarString = (price) => String(price).split('.').map((e, i) => {
    if (i) {
        (i > 1 || e.length > 3) && console.warn('???');
        return e;
    }
    return e.split('').reverse().map((e, i, a) => (!(i % 3) && i) ? `${e},` : e).reverse().join('')
}).join('.');

// TODO: EnglishDollarString

export default {
    ChineseDollarString,
    ChineseStrictNumber,
    ChineseDateString,
    HongKongDollars,
    HongKongDollarsPreventLineBreak,
    ArabicDollarString
};