import React from "react"
import ContentLoader from "react-content-loader"

const VideoCardLoader = ({count, ...props}) => (
  <>
    {Array.from(Array(count), (_, i) => (
      <ContentLoader
        key={i}
        speed={2}
        width={410}
        height={282}
        viewBox="0 0 410 282"
        backgroundColor="#00101C"
        foregroundColor="#23303B"
        {...props}>
        <rect x="29" y="25" rx="3" ry="3" width="63" height="25"/>
        <rect x="24" y="190" rx="3" ry="3" width="156" height="22"/>
        <rect x="22" y="228" rx="3" ry="3" width="208" height="21"/>
        <circle cx="193" cy="126" r="30"/>
        <rect x="335" y="25" rx="5" ry="5" width="25" height="25"/>
        <rect x="103" y="25" rx="3" ry="3" width="50" height="25"/>
        <rect x="295" y="25" rx="5" ry="5" width="25" height="25"/>
        <rect x="255" y="25" rx="5" ry="5" width="25" height="25"/>
      </ContentLoader>
    ))
    }
  </>
)

export default VideoCardLoader