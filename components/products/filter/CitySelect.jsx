import {provinces_with_cities} from "@/components/profile/Products/AddProduct/Location";
import SelectBox from "@/components/SelectBox";
import React, {useEffect, useState} from "react";

const countries = ["ایران"];

const CitySelect = ({
                        formData, setFormDataHandler, setCountry, setProvince, setCity, dark
                    }) => {
    const [countryOptions, setCountryOptions] = useState([]);
    const [provinceOptions, setProvinceOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [selectValues, setSelectValues] = useState({
        country: null, province: null, city: null,
    });
    const getCountryOptions = () => {
        let options = [];
        options = countries.map((country) => {
            return {label: country, value: country};
        });
        return options;
    };

    const getProvincesOptions = () => {
        let options = [];
        Object.keys(provinces_with_cities).map((key) => {
            options.push({
                label: key, value: key,
            });
        });

        return options;
    };

    const getCitiesOptions = () => {
        let options = [];
        if (selectValues.province) {
            options = provinces_with_cities[selectValues.province.value].map((city) => {
                return {
                    value: city, label: city,
                };
            });
        }
        return options;
    };

    useEffect(() => {
        setCountryOptions(getCountryOptions());
    }, []);

    useEffect(() => {
        setProvinceOptions(getProvincesOptions());
    }, [selectValues.country]);

    useEffect(() => {
        setCityOptions(getCitiesOptions());
    }, [selectValues.province]);

    return (<div className="flex flex-col gap-4 relative">
        <SelectBox
        options={countryOptions}
        selected={selectValues.country}
        setSelected={(item) => {
            setSelectValues((prev) => {
                return {
                    ...prev, country: item,
                };
            });
            setCountry(item.value);
        }}
        label="کشور"
        dark
        />
        <SelectBox
        options={provinceOptions}
        selected={selectValues.province}
        setSelected={(item) => {
            setSelectValues((prev) => {
                return {
                    ...prev, province: item,
                };
            });
            setProvince(item.value);
        }}
        label="استان"
        dark
        />
        <SelectBox
        options={cityOptions}
        selected={selectValues.city}
        setSelected={(item) => {
            setSelectValues((prev) => {
                return {
                    ...prev, city: item,
                };
            });
            setCity(item.value);
        }}
        label="شهر"
        dark
        />
    </div>);
};

export default CitySelect;
