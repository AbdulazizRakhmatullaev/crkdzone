import React from 'react'
import Image from 'next/image';

const Loading = () => {
    return (
        <div className="loadcol h-full fl items-center justify-center">
            <div className="clcrd">
                <Image
                    src="/callcard-4.gif"
                    alt="img"
                    priority={true}
                    unoptimized={true}
                    width={600}
                    height={155}
                />
            </div>
            <div className="clcrd">
                <Image
                    src="/callcard-2.gif"
                    alt="img"
                    priority={true}
                    unoptimized={true}
                    width={600}
                    height={155}
                />
            </div>
            <div className="font-HitConBlk text-4xl">
                <div className="animate-ping absolute">
                    CRACKEDZONE
                </div>
                <div>
                    CRACKEDZONE
                </div>
            </div>
            <div className="clcrd">
                <Image
                    src="/callcard-1.webp"
                    alt="img"
                    priority={true}
                    unoptimized={true}
                    width={600}
                    height={155}
                />
            </div>
            <div className="clcrd">
                <Image
                    src="/callcard-3.gif"
                    alt="img"
                    priority={true}
                    unoptimized={true}
                    width={600}
                    height={155}
                />
            </div>
        </div>
    )
}

export default Loading;