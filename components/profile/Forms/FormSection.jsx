import React, {useState} from 'react';
import ButtonIcon from "@/components/ButtonIcon";
import {MdEdit} from "react-icons/md";
import {IoClose} from "react-icons/io5";
import Button from "@/components/Button";

function FormSection({isFormDisable, setFormDisable, handleSubmit, title, alertMessage, children}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full flex items-center gap-5">
        <span className="flex-initial">{title}</span>
        {isFormDisable ?
          <ButtonIcon onClick={() => {
            setFormDisable(false)
          }} icon={<MdEdit/>} className="bg-secondary-400 text-2xl h-12 w-12"/>
          :
          <>
            <ButtonIcon onClick={()=>{
              setFormDisable(true)
            }} icon={<IoClose/>} className="bg-white text-secondary-400 text-2xl h-12 w-12"/>
            <Button type={"submit"} className="bg-success h-12">
              ذخیره تغییرات
            </Button>
          </>
        }
        {alertMessage && <div className="alert alert-danger">{alertMessage}</div>}
      </div>
      <div
        className={`w-full text-gray-500 bg-secondary-light rounded-3xl border p-10 mt-8 ${isFormDisable ? 'border-accent' : 'border-primary'}`}>
        {children}
      </div>
    </form>
  );
}

export default FormSection;