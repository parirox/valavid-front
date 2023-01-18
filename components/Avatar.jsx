import Image from 'next/image';
import React from "react";
import ReactAvatar from "react-avatar";

const Avatar = ({src, alt, badge, size}) => (
  <div className="flex-initial">
        <div className="relative full">
          {src ?
            <Image src={src} alt={alt} width={size} height={size}
                   className="rounded-full"/> :
            <ReactAvatar round={true} name={alt} size={size}/>}
          {badge}
        </div>
  </div>
)

export default Avatar;