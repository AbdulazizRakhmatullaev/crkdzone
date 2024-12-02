import React from 'react'
import Image from 'next/image';

const Loading = () => {
    return (
        <div className="h-full w-full bg-black">
            <div className='flex flex-col px-[20px] gap-5 h-full items-center justify-center'>
                <Image
                        src="/nuke.gif"
                        alt="img"
                        priority={true}
                        unoptimized={true}
                        width={600}
                        height={155}
                    className='border-solid border border-[#2d2d2d]'
                    />
                <div className='font-HitConBlk uppercase text-[15px]'>
                    Dangerour zone, this is crackedzone.
                </div>
            </div>
        </div>
    )
}

export default Loading;