import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon} from "@heroicons/react/20/solid";
import {forwardRef, Fragment, useEffect, useState} from "react";
import {FaChevronDown} from "react-icons/fa";
import {IoCaretDown} from "react-icons/io5";

const countries = ['ایران']
export const states_with_cities = { "آذربايجان شرقي": ["اسكو", "اهر", "ایلخچی", "باسمنج", "بستان آباد", "بناب", "تبريز", "تسوج", "جلفا", "خسروشهر", "سراب", "سهند", "شبستر", "صوفیان", "مراغه", "مرند", "ملكان", "ممقان", "ميانه", "هاديشهر", "هريس", "هشترود", "ورزقان"], "آذربايجان غربي": ["اروميه", "اشنويه", "بوكان", "تكاب", "خوي", "سر دشت", "سلماس", "شاهين دژ", "ماكو", "مهاباد", "مياندوآب", "نقده", "پلدشت", "پيرانشهر", "چالدران"], "اردبيل": ["اردبيل", "خلخال", "مشگين شهر", "نمين", "نير", "پارس آباد", "گرمي"], "اصفهان": ["آران و بيدگل", "اردستان", "اصفهان", "باغ بهادران", "تودشک", "تيران", "حاجي آباد", "خميني شهر", "خوانسار", "درچه", "دهاقان", "زرين شهر", "سميرم", "شهرضا", "عسگران", "علويجه", "فلاورجان", "كاشان", "مباركه", "نجف آباد", "نطنز", "ورزنه", "کوهپایه", "گلپايگان"], "ايلام": ["آبدانان", "ايلام", "ايوان", "دره شهر", "دهلران", "سرابله", "مهران"], "بوشهر": ["اهرم", "برازجان", "بوشهر", "جم", "خورموج", "دير", "عسلویه", "كنگان", "کاکی", "گناوه"], "تهران": ["اسلامشهر", "باقرشهر", "بومهن", "تجريش", "تهران", "دماوند", "رباط كريم", "رودهن", "ري", "شريف آباد", "شهريار", "فشم", "فيروزكوه", "قدس", "قرچك", "كهريزك", "لواسان", "ملارد", "ورامين", "پاكدشت", "چهاردانگه"], "چهارمحال بختياري": ["اردل", "بروجن", "شهركرد", "فارسان", "لردگان", "چلگرد"], "خراسان جنوبي": ["بيرجند", "سربيشه", "فردوس", "قائن", "نهبندان"], "خراسان رضوي": ["تايباد", "تربت جام", "تربت حيدريه", "خواف", "درگز", "سبزوار", "سرخس", "طبس", "طرقبه", "فريمان", "قوچان", "كاشمر", "مشهد", "نيشابور", "چناران", "گناباد"], "خراسان شمالي": ["آشخانه", "اسفراين", "بجنورد", "جاجرم", "شيروان"], "خوزستان": ["آبادان", "انديمشك", "اهواز", "ايذه", "ايرانشهر", "باغ ملك", "بندر امام خميني", "بندر ماهشهر", "بهبهان", "حمیدیه", "خرمشهر", "دزفول", "رامشیر", "رامهرمز", "سوسنگرد", "شادگان", "شادگان", "شوش", "شوشتر", "لالي", "مسجد سليمان", "ملاثانی", "هنديجان", "هويزه"], "زنجان": ["آب بر", "ابهر", "خدابنده", "خرمدره", "زنجان", "قيدار", "ماهنشان"], "سمنان": ["ايوانكي", "بسطام", "دامغان", "سمنان", "شاهرود", "گرمسار"], "سيستان و بلوچستان": ["ايرانشهر", "خاش", "زابل", "زاهدان", "سراوان", "سرباز", "ميرجاوه", "چابهار"], "فارس": ["آباده", "اردكان", "ارسنجان", "استهبان", "اقليد", "بوانات", "جهرم", "حاجي آباد", "خرامه", "خنج", "داراب", "زرقان", "سروستان", "سوريان", "سپيدان", "شيراز", "صفاشهر", "فراشبند", "فسا", "فيروز آباد", "كازرون", "لار", "لامرد", "مرودشت", "مهر", "کوار"], "قزوين": ["آبيك", "بوئين زهرا", "تاكستان", "قزوين"], "قم": ["قم"], "کرج": ["اشتهارد", "طالقان", "كرج", "ماهدشت", "نظرآباد", "هشتگرد"], "كردستان": ["بانه", "بيجار", "حسن آباد", "سقز", "سنندج", "صلوات آباد", "قروه", "مريوان"], "كرمان": ["انار", "بافت", "بردسير", "بم", "جيرفت", "راور", "رفسنجان", "زرند", "سيرجان", "كرمان", "كهنوج", "کوهبنان"], "كرمانشاه": ["اسلام آباد غرب", "جوانرود", "سنقر", "صحنه", "قصر شيرين", "كرمانشاه", "كنگاور", "هرسين", "پاوه"], "كهكيلويه و بويراحمد": ["دهدشت", "دوگنبدان", "سي سخت", "ياسوج", "گچساران"], "گلستان": ["آزاد شهر", "آق قلا", "راميان", "علي آباد كتول", "كردكوی", "كلاله", "گرگان", "گنبد كاووس"], "گيلان": ["آستارا", "املش", "تالش", "رشت", "رودبار", "شفت", "صومعه سرا", "فومن", "لاهیجان", "لنگرود", "ماسال", "ماسوله", "منجيل", "هشتپر"], "لرستان": ["ازنا", "الشتر", "اليگودرز", "بروجرد", "خرم آباد", "دزفول", "دورود", "كوهدشت", "ماهشهر", "نور آباد"], "مازندران": ["آمل", "بابل", "بابلسر", "بلده", "بهشهر", "تنكابن", "جويبار", "رامسر", "ساري", "قائم شهر", "محمود آباد", "نكا", "نور", "نوشهر", "چالوس"], "مركزي": ["آشتيان", "اراك", "تفرش", "خمين", "دليجان", "ساوه", "شازند", "محلات"], "هرمزگان": ["بستك", "بندر جاسك", "بندر خمیر", "بندر لنگه", "بندرعباس", "حاجي آباد", "دهبارز", "قشم", "قشم", "كيش", "ميناب"], "همدان": ["اسدآباد", "بهار", "رزن", "ملاير", "نهاوند", "همدان"], "يزد": ["ابركوه", "اردكان", "اشكذر", "بافق", "تفت", "خضرآباد", "زارچ", "طبس", "مهريز", "ميبد", "هرات", "يزد"] };

function CitySelect({ value, setState, ...rest }, ref) {
  const [countryState, setCountryState] = useState(value.country || 'ایران');
  const [stateState, setStateState] = useState(value.state ?? 'تهران');
  const [cityState, setCityState] = useState(value.city ?? 'تهران');

  const [cityOptions, setCityOptions] = useState(states_with_cities['تهران']);

  function ChangeStateHandler(value) {
    setCityOptions(states_with_cities[value])
    setCityState(states_with_cities[value][0])
    setStateState(value)
  }

  function ChangeCityHandler(value) {
    setCityState(value)
  }

  useEffect(() => {
    setState({
      country: countryState,
      state: stateState,
      city: cityState,
    })
  }, [countryState, stateState, cityState])

  return (
    <div className="rounded-full h-full w-1/2 text-white">
      <div className="flex flex-row gap-8 h-full">
        <div className="basis-4/12 py-1 h-full">
          <Listbox value={countryState} onChange={setCountryState} disabled>
            <div className="input-secondary relative">
              <Listbox.Button className="flex gap-3 items-center justify-between h-full relative w-full cursor-default rounded-lg py-2 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate text-white">
                  {countryState}
                </span>
                <FaChevronDown />
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto scrollbar rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {countries.map((val, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active
                          ? "bg-amber-100 text-amber-900"
                          : "text-gray-900"
                        }`
                      }
                      value={val}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate text-accent ${selected ? "font-medium" : "font-normal"
                              }`}
                          >
                            {val}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        <div className="basis-4/12 py-1 h-full">
          <Listbox value={stateState} onChange={ChangeStateHandler} {...rest}>
            <div className="relative input-secondary">
              <Listbox.Button className="flex gap-3 items-center justify-between h-full relative w-full cursor-default rounded-lg py-2 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate text-white">
                  {stateState}
                </span>
                <IoCaretDown />
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto scrollbar rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {Object.entries(states_with_cities).map((val, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active
                          ? "bg-amber-100 text-amber-900"
                          : "text-gray-900"
                        }`
                      }
                      value={val[0]}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate text-accent ${selected ? "font-medium" : "font-normal"
                              }`}
                          >
                            {val[0]}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        <div className="basis-4/12 py-1 h-full">
          <Listbox value={cityState} onChange={ChangeCityHandler} {...rest}>
            <div className="input-secondary relative">
              <Listbox.Button className="flex gap-3 items-center justify-between h-full relative w-full cursor-default rounded-lg py-2 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate text-white">
                  {cityState}
                </span>
                <FaChevronDown />
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto scrollbar rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {cityOptions.map((val, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active
                          ? "bg-amber-100 text-amber-900"
                          : "text-gray-900"
                        }`
                      }
                      value={val}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate text-accent ${selected ? "font-medium" : "font-normal"
                              }`}
                          >
                            {val}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
    </div>
  );
}
export default forwardRef(CitySelect)