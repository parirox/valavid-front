import { toast } from 'react-toastify';

export const handleApiError = (response) => {
  const statusCode = response && response.status;
  if (statusCode === 500) {
    toast.error("خطايی در سرور رخ داده است. لطفا دوباره تلاش كنيد.");
  } else if (statusCode === 403) {
    toast.error("سطح دسترسی غير مجاز می باشد.");
  } else if (statusCode === 401) {
  } else if (statusCode === 404) {
    toast.error("محتوايی برای درخواست شما يافت نشد.");
  } else if (statusCode === 400) {
    Object.keys(response.data).map((item) => {
      response.data[item].forEach((err) => {
        toast.error(`${item}:${err}`);
      });
    });
  }
};
