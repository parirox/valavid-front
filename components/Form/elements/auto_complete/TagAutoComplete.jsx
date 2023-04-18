import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useSearchTagsMutation} from "@/datasources/product/remote/ProductSliceApi";
import {Combobox, Transition} from "@headlessui/react";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import classNames from "classnames";
import {isEmpty} from "@/utils/general";
import PropTypes from "prop-types";
import {useRouter} from "next/router";

const TagAutoComplete = ({value, onChange, searchHandler, className}) => {

    const [fetch, {isLoading}] = useSearchTagsMutation()

    const [isOpen, setOpen] = useState(false)
    const [isLock, setLock] = useState(true)
    const [items, setItems] = useState([])
    const [inputValue, setInputValue] = useState(value)
    const timeoutId = useRef();

    const router = useRouter()

    useEffect(() => {
        if (!isEmpty(inputValue) && inputValue.length > 2 && !isLock) {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
                timeoutId.current = null;
            }
            timeoutId.current = setTimeout(() => {
                fetch({search: inputValue}).unwrap().then((res) => {
                    const items = res?.results ?? res
                    setItems(items.slice(0, 10))
                    setOpen(true)
                }).catch((err) => {
                    setItems([])
                    setOpen(false)
                    console.log({err})
                })
            }, 600);
        }
        return () => clearTimeout(timeoutId.current);
    }, [fetch, inputValue, isLock])

    useEffect(() => {
        if (router.isReady && !isEmpty(router.query?.search)) {
            setInputValue(router.query.search)
        }
    }, [router.isReady, router.query])

    const _searchHandler = useCallback((value) => {
        searchHandler(value)
        setInputValue(value)
        setOpen(false)
        setLock(true)
    }, [searchHandler])

    return (<div className={"relative h-full"}>
            <div className={"relative h-full"}>
                <input
                    onFocus={()=>{
                        setLock(false)
                    }}
                    autoComplete="off"
                    placeholder="جستجوی عبارت ..."
                    onKeyDown={(event) => {
                        if (event.key === "Enter") _searchHandler(inputValue)
                    }}
                    className={classNames({
                        [className]: !!className, "input text-white bg-transparent full": !className
                    })}
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}/>
                <span className={"absolute left-5 top-1/2 -translate-y-1/2 text-white"}>
                  {isLoading && <AiOutlineLoading3Quarters className={"animate-spin"}/>}
                </span>
            </div>

            {isOpen && <div className="fixed inset-0 z-50" onClick={() => setOpen(false)}></div>}
            <ul className={classNames("absolute right-0 -bottom-1 translate-y-full left-0 z-[60] backdrop-blur flex flex-wrap gap-3 rounded-lg bg-secondary-400/80 w-full text-white", {
                "p-3": items.length, "hidden": !isOpen
            })}>
                {items.map((val, index) => (
                    <li
                        className={classNames("btn rounded-full shadow-xl min-h-0 border-none p-5 cursor-pointer flex items-center gap-3 btn-accent font-bold h-[24px]", {
                            "animate-in zoom-in": isOpen, "animate-out fade-out": !isOpen
                        })}
                        key={index} onClick={() => _searchHandler(val.title)}>
                        {val.title}
                    </li>
                ))}
            </ul>
    </div>
    );
};

TagAutoComplete.propTypes = {
    // todo
    onKeyDown: PropTypes.func
}
export default TagAutoComplete;