import React, {useId} from "react"
import ContentLoader from "react-content-loader"

const ProfileCardLoader = (props) => {
  const id = useId()
  return (
    <ContentLoader
      uniqueKey={id}
      speed={2}
      width={350}
      height={650}
      viewBox="0 0 370 650"
      backgroundColor="#303D47"
      foregroundColor="#23303B"
      {...props}
    >
      <rect x="144" y="306" rx="3" ry="3" width="86" height="34" />
      <rect x="120" y="353" rx="3" ry="3" width="135" height="29" />
      <circle cx="189" cy="170" r="102" />
      <rect x="251" y="90" rx="15" ry="15" width="38" height="38" />
      <rect x="144" y="426" rx="3" ry="3" width="91" height="37" />
      <rect x="32" y="30" rx="5" ry="5" width="57" height="49" />
      <rect x="32" y="503" rx="3" ry="3" width="310" height="60" />
      <rect x="32" y="577" rx="3" ry="3" width="310" height="60" />
    </ContentLoader>
  )
}

export default ProfileCardLoader