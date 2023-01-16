import React, { useState } from "react";
import TextInput from "@/components/TextInput";
import TextArea from "@/components/TextArea";
import SuccessIcon from "@/public/icons/SuccessIcon.svg";

const LangInfo = ({ handleChangeTranlations, translations }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: "اطلاعات زبان فارسی",
      titleLabel: "عنوان محصول",
      descriptionLabel: "توضیحات",
      language_code: "fa",
    },
    {
      label: "اطلاعات زبان انگلیسی",
      titleLabel: "Product title",
      descriptionLabel: "Description",
      language_code: "en",
    },
    {
      label: "اطلاعات زبان عربی",
      titleLabel: "عنوان المنتج",
      descriptionLabel: "وصف",
      language_code: "ar",
    },
    {
      label: "اطلاعات زبان فرانسوی",
      titleLabel: "Titre du produit",
      descriptionLabel: "La description",
      language_code: "fr",
    },
    {
      label: "اطلاعات زبان ترکی",
      titleLabel: "Ürün başlığı",
      descriptionLabel: "Açıklama",
      language_code: "tr",
    },
  ];

  const renderInputs = (translation) => {
    return (
      <div>
        <TextInput
          onChange={(e) => {
            handleChangeTranlations(translation, "title", e.target.value);
          }}
          value={translations[translation.language_code].title || ""}
          background="bg-[#F8F8F8]"
          label={translation.titleLabel}
        />
        <div className="my-[3rem]">
          <TextArea
            onChange={(e) =>
              handleChangeTranlations(
                translation,
                "description",
                e.target.value
              )
            }
            value={translations[translation.language_code].description || ""}
            background="bg-[#F8F8F8]"
            label={translation.descriptionLabel}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="border border-color8 rounded-[23px] mt-[4rem] overflow-hidden">
      <div className="bg-color8 text-secondary-300 h-[5rem] flex items-center justify-between mb-[5rem]">
        {tabs.map((tab, index) => (
          <div
            onClick={() => setActiveTab(index)}
            className={`${
              activeTab === index && "bg-[#F8F8F8] text-secondary"
            } h-[100%] flex items-center p-4 flex-1 justify-center cursor-pointer`}
            key={index}
          >
            {tab.label}
            {translations[tab.language_code].title &&
              translations[tab.language_code].description && (
                <div className="w-[1.5rem] h-[1.5rem] mx-2">
                  <SuccessIcon />
                </div>
              )}
          </div>
        ))}
      </div>
      {renderInputs(tabs[activeTab])}
    </div>
  );
};

export default LangInfo;
