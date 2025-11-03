import Image from 'next/image'
import React from 'react'

const GenerateVideo = () => {
  return (
    <div className="relative w-full max-w-[972px] mx-auto">
        <Image src="/image.png" alt="generate" width={822} height={822} />
        <div className="absolute top-[45.5%] left-[20.9%] w-[60%] h-[calc(45%-44px)] rounded-[50px] overflow-hidden translate-y-[-3px]">
  <video 
    className="object-cover w-full "
    autoPlay 
    loop 
    muted 
    playsInline
  >
    <source src="/generateV.mp4" type="video/mp4" />
  </video>
</div>


</div>

  )
}

export default GenerateVideo