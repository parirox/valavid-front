import React, {useEffect, useRef, useState} from 'react';
import {isEmpty} from "@/utils/general";
import PropTypes from "prop-types";

const _AutoCompleteLogic = ({
                                ApiHook, defaultValue, onChange, onKeyDown = () => {
    }, field_name = "title", children
                            }) => {
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
        if (words.length > 6) {
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
        console.log({selected})
        if(!isEmpty(selected)) onChange(selected)
    }, [selected])

    useEffect(() => {
        setInputValue(defaultValue)
    }, [defaultValue])

    useEffect(() => {
        if (!isEmpty($input.current)) $input.current.addEventListener('keydown', onKeyDown);
        return ()=>{
            if (!isEmpty($input.current)) $input.current.removeEventListener('keydown', onKeyDown);
        }
    }, [$input.current])

    return children({isLoading, items, selected, setSelected, displayValue, setInputValue, $input});
};

_AutoCompleteLogic.propTypes = {
    // todo
    onKeyDown: PropTypes.func
}
export default _AutoCompleteLogic;