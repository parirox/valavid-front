import {toast as _toast} from 'react-hot-toast';
import {getErrorMessage} from '../errors/errorsMessages';

const default_options = {position: "top-left"}

let toast_error = _toast.error;
_toast.error = (message, options = default_options) => {
    const error_msg = getErrorMessage(message);
    return toast_error.bind(this)(error_msg, options);
};

let toast_success = _toast.success;
_toast.success = (message, options = default_options) => {
    return toast_success.bind(this)(message, options);
};

_toast.info = (message, options = default_options) => {
    return _toast(message, {
        icon: '⚠️',
        ...options
    });
};


export default _toast;
