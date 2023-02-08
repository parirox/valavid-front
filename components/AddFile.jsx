import React, { useCallback } from "react";
import UploadIcon from "@/public/icons/UploadCloud.svg";
import { useDropzone } from "react-dropzone";

const AddFile = ({ handleSelectFile }) => {
  const onDrop = useCallback((acceptedFiles) => {
    handleSelectFile(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="p-3 rounded-3xl h-80 border-2 border-dashed border-secondary-200 overflow-hidden relative">
      <div
        className="rounded-3xl h-full bg-[#13222D] flex items-center justify-center"
        {...getRootProps({
          onClick: (event) => event.stopPropagation(),
          role: "button",
          "aria-label": "drag and drop area",
        })}
      >
        {/* <div {...getRootProps()}> */}
        <input multiple accept="video/*,image/*" {...getInputProps()} />
        {isDragActive && (
          <div className="bg-[#6b728078] flex absolute w-full h-full top-0 right-0"></div>
        )}
        {/* </div> */}
        <div className="flex flex-col items-center justify-center">
          <UploadIcon />
          <span className="py-4">
            برای بارگزاری محصول فایل یا فایل های خود را اینجا بکشید.
          </span>
          <input
            onChange={(e) => {
              handleSelectFile(e.target.files);
            }}
            multiple
            onClick={(e) => (e.target.value = null)}
            id="file-input"
            type="file"
            className="hidden"
            accept="video/*,image/*"
          />
          <label
            htmlFor="file-input"
            className={
              "cursor-pointer rounded-full full bg-primary w-[238px] h-[65px] flex items-center justify-center"
            }>
            انتخاب فایل
          </label>
          <div className="flex items-center text-[#303D47] mt-4">
            <span className="ml-4">فرمت های پشتیبانی</span>
            <span>video/*,image/*</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFile;
