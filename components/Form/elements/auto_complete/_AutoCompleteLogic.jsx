import React, {useEffect, useRef, useState} from 'react';
import {isEmpty} from "@/utils/general";

const _AutoCompleteLogic = ({ApiHook, onChange, field_key = "id", field_name = "title", children}) => {
  const [fetch, {isLoading}] = ApiHook()

  const [items, setItems] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [selected, setSelected] = useState({})
  const $input = useRef()
  const timeoutId = useRef();

  const displayValue = (value) => {
    if (isEmpty(inputValue)) return ""
    if ((document.activeElement === $input.current) || isEmpty(value)) {
      return inputValue
    }
    const words = value?.[field_name].split(" ")
    if(words.length > 6){
      return (words.slice(0, 6).join(" ").concat(" ...") ?? inputValue)
    }
    return (words.join(" ") ?? inputValue)
  }

  useEffect(() => {
    if (!isEmpty(inputValue) && inputValue.length > 2) {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }
      timeoutId.current = setTimeout(() => {
        fetch({search: inputValue}).unwrap().then((res) => {
          const items = res?.results ?? res
          setItems(items.slice(0, 10))
        }).catch((err) => {
          setItems([])
          console.log({err})
        })
      }, 600);
    }
    return () => clearTimeout(timeoutId.current);
  }, [inputValue])

  useEffect(() => {
    onChange(selected[field_key])
  }, [selected])

  return children({isLoading, items, selected, setSelected, displayValue, setInputValue, $input});
};

export default _AutoCompleteLogic;