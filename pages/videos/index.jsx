import CoverPage from "@/components/CoverPage";
import SortTabs from "@/components/SortTabs";
import Head from "next/head";
import VideoIcon from '@/public/icons/FillVideoPrimary.svg';
import PicMountain from '@/public/images/astara_mountain.jpg';
import PopularCardVideo from "@/components/PopularCardVideo";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
// Filter Drawern sidebar
import { TiFilter } from "react-icons/ti"
import { ImPriceTag } from "react-icons/im"
import { IoIosArrowDown } from "react-icons/io"
import RangeInput from "@/components/RangeInput";
import { Disclosure, RadioGroup, Transition } from "@headlessui/react";


const data = [
  {
    id: 1,
    type: "video",
    title: "مقبره بزرگ زیبای شب در شهر اصفهان",
    author: {
      name: "حمید باقری",
      profile_image: "https://placeimg.com/192/192/people",
    },
    price: "2,500 T",
    stats: {
      liked: false,
      cart_added: false,
      added_in_collection: false,
    },
    media: {
      alt: "natural",
      src: "/videos/sample1.mp4"
    }
  },
  {
    id: 4,
    type: "video",
    title: "مقبره بزرگ زیبای شب در شهر اصفهان",
    author: {
      name: "حمید باقری",
      profile_image: "https://placeimg.com/192/192/people",
    },
    price: "2,500 T",
    stats: {
      liked: false,
      cart_added: false,
      added_in_collection: false,
    },
    media: {
      alt: "natural",
      src: "/videos/sample2.mp4"
    }
  },
  {
    id: 1,
    type: "video",
    title: "مقبره بزرگ زیبای شب در شهر اصفهان",
    author: {
      name: "حمید باقری",
      profile_image: "https://placeimg.com/192/192/people",
    },
    price: "2,500 T",
    stats: {
      liked: false,
      cart_added: false,
      added_in_collection: false,
    },
    media: {
      alt: "natural",
      src: "/videos/sample1.mp4"
    }
  },
  {
    id: 4,
    type: "video",
    title: "مقبره بزرگ زیبای شب در شهر اصفهان",
    author: {
      name: "حمید باقری",
      profile_image: "https://placeimg.com/192/192/people",
    },
    price: "2,500 T",
    stats: {
      liked: false,
      cart_added: false,
      added_in_collection: false,
    },
    media: {
      alt: "natural",
      src: "/videos/sample2.mp4"
    }
  },
  {
    id: 1,
    type: "video",
    title: "مقبره بزرگ زیبای شب در شهر اصفهان",
    author: {
      name: "حمید باقری",
      profile_image: "https://placeimg.com/192/192/people",
    },
    price: "2,500 T",
    stats: {
      liked: false,
      cart_added: false,
      added_in_collection: false,
    },
    media: {
      alt: "natural",
      src: "/videos/sample1.mp4"
    }
  },
  {
    id: 4,
    type: "video",
    title: "مقبره بزرگ زیبای شب در شهر اصفهان",
    author: {
      name: "حمید باقری",
      profile_image: "https://placeimg.com/192/192/people",
    },
    price: "2,500 T",
    stats: {
      liked: false,
      cart_added: false,
      added_in_collection: false,
    },
    media: {
      alt: "natural",
      src: "/videos/sample2.mp4"
    }
  },
  {
    id: 1,
    type: "video",
    title: "مقبره بزرگ زیبای شب در شهر اصفهان",
    author: {
      name: "حمید باقری",
      profile_image: "https://placeimg.com/192/192/people",
    },
    price: "2,500 T",
    stats: {
      liked: false,
      cart_added: false,
      added_in_collection: false,
    },
    media: {
      alt: "natural",
      src: "/videos/sample1.mp4"
    }
  },
  {
    id: 1,
    type: "video",
    title: "مقبره بزرگ زیبای شب در شهر اصفهان",
    author: {
      name: "حمید باقری",
      profile_image: "https://placeimg.com/192/192/people",
    },
    price: "2,500 T",
    stats: {
      liked: false,
      cart_added: false,
      added_in_collection: false,
    },
    media: {
      alt: "natural",
      src: "/videos/sample1.mp4"
    }
  },
  {
    id: 4,
    type: "video",
    title: "مقبره بزرگ زیبای شب در شهر اصفهان",
    author: {
      name: "حمید باقری",
      profile_image: "https://placeimg.com/192/192/people",
    },
    price: "2,500 T",
    stats: {
      liked: false,
      cart_added: false,
      added_in_collection: false,
    },
    media: {
      alt: "natural",
      src: "/videos/sample2.mp4"
    }
  },
]

export default function Videos() {
  const [formData, setFormData] = useState({
    price: 0,
    resolution: 0,
    frameRate: 0,
    duration: 0,
    setting: null,
    space: null,
    light: null,
    colorTheme: null,
    numberOfPeople: 0,
    gender: null,
    cameraAngle: null,
    framing: null,
    location: [null, null, null]
  })
  const rates = [24, 28, 33]
  const resolutions = ['همه', 'HD', '2K', '4K']
  const settings = ['لوپ', 'آلفاچنل']
  const spaces = ['باز', 'بسته']
  const lights = ['روشن', 'تاریک']

  const setFormDataHandler = (field) => (value) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }))
  }
  useEffect(() => {
    console.log(formData);
  }, [formData])

  return (
    <>
      <Head>
        <title>Valavid | Videos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CoverPage className="bg-gradient-to-l from-[#13222db3] via-[#14232f59] to-[#13222db3]" backgroundImage={PicMountain} icon={<VideoIcon />}>
      مجموعه فیلم ویدئویی با کیفیت باورنکردنی
      </CoverPage>
      <div className="flex w-full">
        <div className="basis-1/4 bg-secondary-light pt-8 px-7">
          <Button
            className="h-14 w-40 rounded-2xl text-xl font-light bg-[#26333E] mr-2"
            icon={<TiFilter className="text-[2.1rem]" />}
          >
            فیلترها
          </Button>
          <div className="flex flex-col gap-14 pt-14">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button>
                    <div className="flex items-center justify-between gap-4 text-lg mr-3">
                      <div className="flex items-center gap-4">
                        <ImPriceTag className="text-2xl" />
                        قیمت
                      </div>
                      <IoIosArrowDown className={`text-2xl text-secondary-200 mr-auto transition-all duration-500 ${open ? 'rotate-180' : 'rotate-0'}`} />

                    </div>
                  </Disclosure.Button>

                  <Transition
                    enter="transition duration-1000 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-250 ease-in-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0">
                    <Disclosure.Panel className="border-b border-secondary-400 pr-2">
                      <div className="w-full relative pt-10 py-24 px-3">
                        <RangeInput min={0} max={1000000} step={1000} state={formData.price} setState={setFormDataHandler('price')}></RangeInput>
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}

            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button>
                    <div className="flex items-center justify-between gap-4 text-lg mr-3">
                      <div className="flex items-center gap-4">
                        <ImPriceTag className="text-2xl" />
                        رزولوشن
                      </div>
                      <IoIosArrowDown className={`text-2xl text-secondary-200 mr-auto transition-all duration-500 ${open ? 'rotate-180' : 'rotate-0'}`} />

                    </div>
                  </Disclosure.Button>

                  <Transition
                    enter="transition duration-1000 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-250 ease-in-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0">
                    <Disclosure.Panel className="border-b border-secondary-400 pr-2">
                      <div className="w-full relative pt-0 py-10 px-3">
                        <RadioGroup value={formData.resolution} className="flex gap-4" onChange={setFormDataHandler('resolution')}>

                          {resolutions.map(resolution => (
                            <RadioGroup.Option value={resolution} key={resolution}
                              className={({ active, checked }) =>
                                `
                                ${checked ? 'text-primary bg-white' : ''
                                }
                                w-fit flex justify-center items-center min-w-[5.5rem] px-4 py-2 rounded-xl border border-secondary-400 text-secondary-300`
                              }
                            >

                              <button>{resolution}</button>

                            </RadioGroup.Option>
                          )
                          )}
                        </RadioGroup>
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}

            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button>
                    <div className="flex items-center justify-between gap-4 text-lg mr-3">
                      <div className="flex items-center gap-4">
                        <ImPriceTag className="text-2xl" />
                        فریم ریت
                      </div>
                      <IoIosArrowDown className={`text-2xl text-secondary-200 mr-auto transition-all duration-500 ${open ? 'rotate-180' : 'rotate-0'}`} />

                    </div>
                  </Disclosure.Button>

                  <Transition
                    enter="transition duration-1000 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-250 ease-in-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0">
                    <Disclosure.Panel className="border-b border-secondary-400 pr-2">
                      <div className="w-full relative pt-0 py-10 px-3">
                        <RadioGroup value={formData.frameRate} className="flex gap-4" onChange={setFormDataHandler('frameRate')}>

                          {rates.map(rate => (
                            <RadioGroup.Option value={rate + ' fps'} key={rate}
                              className={({ active, checked }) =>
                                `
                          ${checked ? 'text-primary bg-white' : ''
                                }
                          w-fit flex justify-center items-center min-w-[5.5rem] px-4 py-2 rounded-xl border border-secondary-400 text-secondary-300`
                              }
                            >

                              <button>{rate + ' fps'}</button>

                            </RadioGroup.Option>
                          )
                          )}
                        </RadioGroup>
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}

            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button>
                    <div className="flex items-center justify-between gap-4 text-lg mr-3">
                      <div className="flex items-center gap-4">
                        <ImPriceTag className="text-2xl" />
                        زمان
                      </div>
                      <IoIosArrowDown className={`text-2xl text-secondary-200 mr-auto transition-all duration-500 ${open ? 'rotate-180' : 'rotate-0'}`} />

                    </div>
                  </Disclosure.Button>

                  <Transition
                    enter="transition duration-1000 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-250 ease-in-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0">
                    <Disclosure.Panel className="border-b border-secondary-400 pr-2">
                      <div className="w-full relative pt-10 py-24 px-3">
                        <RangeInput min={0} max={60} unit="دقیقه" step={1} state={formData.duration} setState={setFormDataHandler('duration')}></RangeInput>
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}

            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button>
                    <div className="flex items-center justify-between gap-4 text-lg mr-3">
                      <div className="flex items-center gap-4">
                        <ImPriceTag className="text-2xl" />
                        تنظیمات
                      </div>
                      <IoIosArrowDown className={`text-2xl text-secondary-200 mr-auto transition-all duration-500 ${open ? 'rotate-180' : 'rotate-0'}`} />

                    </div>
                  </Disclosure.Button>

                  <Transition
                    enter="transition duration-1000 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-250 ease-in-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0">
                    <Disclosure.Panel className="border-b border-secondary-400 pr-2">
                      <div className="w-full relative pt-0 py-10 px-3">
                        <RadioGroup value={formData.setting} className="flex gap-4" onChange={setFormDataHandler('setting')}>

                          {settings.map(opt => (
                            <RadioGroup.Option value={opt} key={opt}
                              className={({ active, checked }) =>
                                `
                                ${checked ? 'text-primary bg-white' : ''
                                }
                                w-fit flex justify-center items-center min-w-[5.5rem] px-4 py-2 rounded-xl border border-secondary-400 text-secondary-300`
                              }
                            >

                              <button>{opt}</button>

                            </RadioGroup.Option>
                          )
                          )}
                        </RadioGroup>
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}

            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button>
                    <div className="flex items-center justify-between gap-4 text-lg mr-3">
                      <div className="flex items-center gap-4">
                        <ImPriceTag className="text-2xl" />
                        فضا
                      </div>
                      <IoIosArrowDown className={`text-2xl text-secondary-200 mr-auto transition-all duration-500 ${open ? 'rotate-180' : 'rotate-0'}`} />

                    </div>
                  </Disclosure.Button>

                  <Transition
                    enter="transition duration-1000 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-250 ease-in-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0">
                    <Disclosure.Panel className="border-b border-secondary-400 pr-2">
                      <div className="w-full relative pt-0 py-10 px-3">
                        <RadioGroup value={formData.space} className="flex gap-4" onChange={setFormDataHandler('space')}>

                          {spaces.map(space => (
                            <RadioGroup.Option value={space} key={space}
                              className={({ active, checked }) =>
                                `
                                ${checked ? 'text-primary bg-white' : ''
                                }
                                w-fit flex justify-center items-center min-w-[5.5rem] px-4 py-2 rounded-xl border border-secondary-400 text-secondary-300`
                              }
                            >

                              <button>{space}</button>

                            </RadioGroup.Option>
                          )
                          )}
                        </RadioGroup>
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}

            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button>
                    <div className="flex items-center justify-between gap-4 text-lg mr-3">
                      <div className="flex items-center gap-4">
                        <ImPriceTag className="text-2xl" />
                        نور
                      </div>
                      <IoIosArrowDown className={`text-2xl text-secondary-200 mr-auto transition-all duration-500 ${open ? 'rotate-180' : 'rotate-0'}`} />

                    </div>
                  </Disclosure.Button>

                  <Transition
                    enter="transition duration-1000 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-250 ease-in-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0">
                    <Disclosure.Panel className="border-b border-secondary-400 pr-2">
                      <div className="w-full relative pt-0 py-10 px-3">
                        <RadioGroup value={formData.light} className="flex gap-4" onChange={setFormDataHandler('light')}>

                          {lights.map(lightType => (
                            <RadioGroup.Option value={lightType} key={lightType}
                              className={({ active, checked }) =>
                                `
                                ${checked ? 'text-primary bg-white' : ''
                                }
                                w-fit flex justify-center items-center min-w-[5.5rem] px-4 py-2 rounded-xl border border-secondary-400 text-secondary-300`
                              }
                            >

                              <button>{lightType}</button>

                            </RadioGroup.Option>
                          )
                          )}
                        </RadioGroup>
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}

            </Disclosure>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button>
                    <div className="flex items-center justify-between gap-4 text-lg mr-3">
                      <div className="flex items-center gap-4">
                        <ImPriceTag className="text-2xl" />
                        تم رنگی
                      </div>
                      <IoIosArrowDown className={`text-2xl text-secondary-200 mr-auto transition-all duration-500 ${open ? 'rotate-180' : 'rotate-0'}`} />

                    </div>
                  </Disclosure.Button>

                  <Transition
                    enter="transition duration-1000 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-250 ease-in-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0">
                    <Disclosure.Panel className="border-b border-secondary-400 pr-2">
                      <div className="w-full relative pt-0 py-10 px-3">
                        <RadioGroup value={formData.setting} className="flex gap-4" onChange={setFormDataHandler('setting')}>

                          {settings.map(opt => (
                            <RadioGroup.Option value={opt} key={opt}
                              className={({ active, checked }) =>
                                `
                                ${checked ? 'text-primary bg-white' : ''
                                }
                                w-fit flex justify-center items-center min-w-[5.5rem] px-4 py-2 rounded-xl border border-secondary-400 text-secondary-300`
                              }
                            >

                              <button>{opt}</button>

                            </RadioGroup.Option>
                          )
                          )}
                        </RadioGroup>
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}

            </Disclosure>
          </div>
        </div>
        <div className="basis-full px-10 pb-[20rem]">
          <SortTabs></SortTabs>
          <div className="flex flex-wrap py-7 w-full">
            {data.map((video, key) => {
              return <PopularCardVideo className="basis-1/3" key={key} data={video} />
            })}
          </div>
        </div>
      </div>
    </>
  )
}