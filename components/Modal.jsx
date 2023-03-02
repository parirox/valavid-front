import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import classNames from "classnames";

function Modal({
  isOpen,
  setIsOpen,
  title,
  closeButton,
  children,
  small,
  big,
  background,
  containerClass,
  modalClass,
  rounded,
  customHeight,
  ...props
}) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[60]" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black backdrop-blur bg-opacity-20" />
        </Transition.Child>

        <div className="scrollbar-thin scrollbar-thumb-primary fixed inset-0 overflow-y-auto">
          <div className={`flex min-h-full items-center justify-center md:p-4 text-center ${containerClass ? containerClass : ""}`}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={
                  classNames(`transform overflow-hidden p-1 md:p-6 text-left align-middle shadow-xl transition-all ${modalClass} ${rounded ? rounded : "rounded-2xl"} ${background ? background : "bg-white"} ${customHeight ? customHeight : (small ? "2xl:w-6/12 md:w-7/12 w-11/12" : big ? "w-full" : "2xl:w-8/12 md:w-9/12 w-11/12")}`)
              }>
                {title && (
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-accent"
                  >
                    {title}
                  </Dialog.Title>
                )}
                {children}
                {closeButton && (
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      {closeButton}
                    </button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
