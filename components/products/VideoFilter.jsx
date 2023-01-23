import React from 'react';
import CollapseElement from "@/components/Form/CollapseElement";
import {ImPriceTag} from "react-icons/im";
import RangeInput from "@/components/RangeInput";
import CheckBoxButton from "@/components/Form/CheckBoxButton";
import {IoMdSpeedometer} from "react-icons/io";
import {IoSpeedometerSharp, IoTimeSharp} from "react-icons/io5";
import {BsPinMapFill} from "react-icons/bs";
import {FaLightbulb, FaPalette, FaUserFriends, FaVenusMars} from "react-icons/fa";
import CheckBoxColorButton from "@/components/Form/CheckBoxColorButton";
import {TbAngle} from "react-icons/tb";
import {AiOutlineRotateRight} from "react-icons/ai";
import {MdOutlineZoomOutMap} from "react-icons/md";
import Location from "@/components/profile/Products/AddProduct/Location";
import CitySelect from "@/components/profile/Forms/CitySelect";

const VideoFilter = ({filterOptions, formData, setFormDataHandler}) => {
  return (
    <>
      <CollapseElement headTitle='قیمت' headIcon={<ImPriceTag className="text-2xl"/>}>
        <div className="pt-5 pb-10">
          <RangeInput min={filterOptions.price[0]} max={filterOptions.price[1]}
                      step={1000} state={formData.price}
                      setState={setFormDataHandler('price')}></RangeInput>
        </div>
      </CollapseElement>

      <CollapseElement headTitle='رزولوشن' headIcon={<MdOutlineZoomOutMap className="text-2xl"/>}>
        {filterOptions?.resolutions && <CheckBoxButton data={filterOptions.resolutions} options={formData.resolution}
                                                       setOptions={setFormDataHandler('resolution')}/>}
      </CollapseElement>

      <CollapseElement headTitle='فریم ریت' headIcon={<IoMdSpeedometer className="text-2xl"/>}>
        <CheckBoxButton data={filterOptions.frame_rates} options={formData.frame_rate}
                        setOptions={setFormDataHandler('frame_rate')}/>
      </CollapseElement>

      <CollapseElement headTitle='زمان' headIcon={<IoTimeSharp className="text-2xl"/>}>
        {filterOptions?.duration && <div className="pt-5 pb-10">
          <RangeInput min={filterOptions.duration[0] ?? 0} max={filterOptions.duration[1] ?? 0} unit="دقیقه" step={1}
                      state={formData.duration} setState={setFormDataHandler('duration')}></RangeInput>
        </div>}
      </CollapseElement>

      <CollapseElement headTitle='فضا' headIcon={<BsPinMapFill className="text-2xl"/>}>
        <CheckBoxButton data={filterOptions.environments} options={formData.environment}
                        setOptions={setFormDataHandler('environment')}/>
      </CollapseElement>

      <CollapseElement headTitle='نور' headIcon={<FaLightbulb className="text-2xl"/>}>
        <CheckBoxButton data={filterOptions.color_themes} options={formData.color_theme}
                        setOptions={setFormDataHandler('color_theme')}/>
      </CollapseElement>

      <CollapseElement headTitle='رنگ غالب' headIcon={<FaPalette className="text-2xl"/>}>
        <CheckBoxColorButton removeButton={true} data={filterOptions.colors} options={formData.colors}
                             setOptions={setFormDataHandler('colors')}/>
      </CollapseElement>

      <CollapseElement headTitle='تعداد انسان' headIcon={<FaUserFriends className="text-2xl"/>}>
        <CheckBoxButton data={filterOptions.people_count} options={formData.people_count}
                        setOptions={setFormDataHandler('people_count')}/>
      </CollapseElement>

      <CollapseElement headTitle='جنسیت انسان ها' headIcon={<FaVenusMars className="text-2xl"/>}>
        <CheckBoxButton data={filterOptions.genders} options={formData.gender}
                        setOptions={setFormDataHandler('gender')}/>
      </CollapseElement>

      <CollapseElement headTitle='زاویه دوربین' headIcon={<TbAngle className="text-2xl"/>}>
        <CheckBoxButton data={filterOptions.camera_angles} options={formData.camera_angle}
                        setOptions={setFormDataHandler('camera_angle')}/>
      </CollapseElement>

      <CollapseElement headTitle='نسبت تصویر' headIcon={<AiOutlineRotateRight className="text-2xl"/>}>
        <CheckBoxButton data={filterOptions.orientations} options={formData.orientation}
                        setOptions={setFormDataHandler('orientation')}/>
      </CollapseElement>
      {/*<CollapseElement headTitle='موقعیت جغرافیایی' headIcon={<AiOutlineRotateRight className="text-2xl"/>}>*/}
      {/*<CitySelect value={{country: filterOptions.country, provinces: filterOptions.province, city:filterOptions.city}} setState={setFormDataHandler('country')}/>*/}
      {/*</CollapseElement>*/}
      <CollapseElement headTitle='سرعت' headIcon={<IoSpeedometerSharp className="text-2xl"/>}>
        <CheckBoxButton data={filterOptions.shutter_speeds} options={formData.shutter_speed}
                        setOptions={setFormDataHandler('shutter_speed')}/>
      </CollapseElement>
    </>
  )
}

export default VideoFilter;