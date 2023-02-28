import {Listbox, Transition} from "@headlessui/react"
import classNames from "classnames";

export default function CheckBoxButton({data = {}, options, setOptions, error, multiple = true}) {
  return (
    <Listbox value={options} onChange={setOptions} multiple={multiple}>
      <Transition
        show={true}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Listbox.Options static className="flex flex-wrap gap-4">
          {Object.entries(data).map(([key, value]) => {
            return (
              <Listbox.Option key={key} value={key}
                              className={classNames('w-fit cursor-pointer flex justify-center items-center min-w-[5.5rem] px-4 py-2 rounded-xl border ui-selected:text-primary ui-selected:bg-white ui-selected:font-bold ui-selected:border-secondary-400 ui-not-selected:border-secondary-400 ui-not-selected:text-secondary-400 lg:ui-not-selected:text-secondary-300',
                                {
                                  '!border-danger': !!error
                                })}>
                {value}
              </Listbox.Option>
            )
          })}
        </Listbox.Options>
      </Transition>
    </Listbox>
  )
}