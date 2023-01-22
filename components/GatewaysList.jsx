import React, {useEffect} from 'react';
import Image from "next/image";
import {useGetGatewaysListQuery} from "@/datasources/payment/remote/PaymentSliceApi";

function GatewaysList({state, setter}) {
  const {
    data,
    isSuccess,
  } = useGetGatewaysListQuery();

  useEffect(()=>{
    if(isSuccess) setter(data[0].key)
  },[isSuccess])

  if (isSuccess) {
    return (
      <div className="flex justify-start items-center gap-4 text-secondary h-24">
        {data.map((gateway, k) => (
          <div
            key={k}
            onClick={() => setter(gateway.key)}
            className={`cursor-pointer h-full`}>
            <Image alt={gateway.name} className={`object-contain p-2 rounded-xl aspect-square transition-400-linear ${
              state === gateway.key
                ? "scale-110 border-2 border-primary bg-white"
                : "bg-[#39464F]"
            }`} width={60} height={60} src={gateway.icon}/>
          </div>
        ))}
      </div>
    );
  }
  return <></>
}

export default GatewaysList;