import React, {useEffect, useRef} from 'react';
import lottie from "lottie-web";
import Anim from "@/public/state_loading.json";

export default function SuccessErrorLoading({isSuccess, isLoading, isError}) {
  const loadingLoopSegment = [0, 120]
  const successLoopSegment = [120, 239]
  const errorLoopSegment = [240, 360]

  const element = useRef(null)
  const lottieInstance = useRef()

  useEffect(() => {
    if (element.current) {
      lottieInstance.current?.destroy()
      lottieInstance.current = lottie.loadAnimation({
        container: element.current,
        renderer: 'svg',
        loop: isLoading,
        autoplay: true,
        initialSegment: loadingLoopSegment,
        animationData: Anim,
      })
    }

    if (isSuccess) lottieInstance.current.playSegments(successLoopSegment, true)
    else if (isError) lottieInstance.current.playSegments(errorLoopSegment, true)
    else if (isLoading) lottieInstance.current.playSegments(loadingLoopSegment, true)

    return () => {
      lottieInstance.current?.destroy()
      lottieInstance.current = null
    }
  }, [isSuccess, isLoading, isError])

  return <div ref={element}/>
}

