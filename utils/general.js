export function isEmpty(value) {
    if (typeof value == 'undefined' || value == 'undefined' || value == null || value == '') {
        return true;
    }
    for (let key in value) {
        if (hasOwnProperty.call(value, key)) {
            return false;
        }
    }
    return false;
}

export function isNumber(value, length = value.length) {
    return !isEmpty(value) && !isNaN(value) && value.length === length;
}

export function stripTags(html) {
    var tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

export function sepereteStr(string, minLength) {
    if (isEmpty(string)) return false;
    let arrStr = string.trim().split(/[\s,]+/);
    if (isEmpty(minLength)) return arrStr.join();
    let newarray = new Array();
    arrStr.forEach(function(value, index, array) {
        if (value.length >= minLength) newarray.push(value);
    });
    return newarray.join();
}

export const setCookie = (res, name, value, options) => {
    const stringValue =
        typeof value === 'object'
            ? 'j:' + JSON.stringify(value)
            : String(value);

    if (typeof options.maxAge === 'number') {
        options.expires = new Date(Date.now() + options.maxAge * 1000);
    }

    res.setHeader('Set-Cookie', serialize(name, stringValue, options));
};

export function setCookieClient(name, value, days) {
    let expires = '';
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

export function getCookieClient(name) {
    let nameEQ = name + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export function eraseCookieClient(name) {
    document.cookie =
        name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


export function parents(el, selector, stopSelector) {
    let retval = null;
    if (isEmpty(selector)) return el.parentNode;
    while (el) {
        if (el.matches(selector)) {
            retval = el;
            break;
        } else if (stopSelector && el.matches(stopSelector)) {
            break;
        }
        el = el.parentElement;
    }
    return retval;
}

export function getOffsetLeft(elem) {
    let offsetLeft = 0;
    do {
        if (!isNaN(elem.offsetLeft)) {
            offsetLeft += elem.offsetLeft;
        }
    } while (elem = elem.offsetParent);
    return offsetLeft;
}

export function domParser(stringTag) {
    let el = document.createElement('div');
    el.innerHTML = stringTag;
    return el.firstChild;
}

export function rmAllDomClass(dom, className) {
    Array.from(dom).forEach((elem, index) => {
        elem.classList.remove(className);
    });
}

export function toItemScroll(parent, element, x_px) {
    let ele = document.querySelector(parent);
    if (ele.scrollHeight > ele.offsetHeight) {
        let elem = ele.querySelector(element);
        ele.scrollTop = elem.offsetTop + x_px;
    }
}

export function hasSelector(selector) {
    return !isEmpty(document.querySelector(selector));
}

export function whenPageLoaded(func) {
    if (window.addEventListener) {
        window.addEventListener('load', func, false);
    } else {
        window.attachEvent('onload', func);
    }
}

export function numberFormat(amount, decimalCount = 2, decimal = '.', thousands = ',') {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? '-' : '';

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '');
    } catch (e) {
        console.log(e);
    }
}

export function setTimer(second, func) {
    var setTimer = setInterval(function() {
        second--;
        if (second === 0) {
            func();
            clearInterval(setTimer);
        }
    }, 1000);
}

export function getIntInString(string) {
    return string.match(/\d/g).join('');
}

export function normalize(val, min, max) {
    let delta = max - min;
    return (val - min) / delta;
}