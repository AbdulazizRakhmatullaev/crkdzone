import React from 'react'
import Image from 'next/image';

const Loading = () => {
    return (
        <div className="loadcol">
            <div className="clcrd">
                <Image
                    src="/callcard-4.gif"
                    alt="img"
                    priority={true}
                    width={600}
                    height={155}
                />
            </div>
            <div className="clcrd">
                <Image
                    src="/callcard-2.gif"
                    alt="img"
                    priority={true}
                    width={600}
                    height={155}
                />
            </div>
            <div className="fl flex-col justify-center items-center h-full font-HitConBlk text-4xl">
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
                    width={600}
                    height={155}
                />
            </div>
            <div className="clcrd">
                <Image
                    src="/callcard-3.gif"
                    alt="img"
                    priority={true}
                    width={600}
                    height={155}
                />
            </div>
        </div>
        // <div className="loadcol">
        //     <svg
        //         className="spinner"
        //         height="100%"
        //         viewBox="0 0 32 32"
        //         width="100%"
        //     >
        //         <circle
        //             cx="16"
        //             cy="16"
        //             fill="none"
        //             r="14"
        //             strokeWidth="2"
        //             style={{ stroke: "rgb(255, 255, 255)", opacity: 0.2 }}
        //         ></circle>
        //         <circle
        //             cx="16"
        //             cy="16"
        //             fill="none"
        //             r="14"
        //             strokeWidth="2"
        //             style={{
        //                 stroke: "rgb(255, 255, 255)",
        //                 strokeDasharray: 80,
        //                 strokeDashoffset: 60,
        //             }}
        //         ></circle>
        //     </svg>
        // </div>
    )
}

export default Loading;