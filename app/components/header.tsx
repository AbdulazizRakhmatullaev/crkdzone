import React from 'react'
import Image, { StaticImageData } from 'next/image';

interface HeaderProps {
    img_src: StaticImageData;
    title: string;
    desc: string;
}

const Header: React.FC<HeaderProps> = ({ img_src, title, desc }) => {
    return (
        <>
            <div className="header">
                <div className='relative'>
                    <Image
                        src={img_src}
                        alt="img"
                        className="hd_img"
                        priority={true}
                        width={490}
                        height={190}
                    />
                    <div className='bg-[#00000055] text-4xl uppercase font-HitConBlk absolute inset-0 flex items-center justify-center'>{title}</div>
                </div>
                <div className="hd_desc text-center">
                    {desc}
                </div>
            </div>
        </>
    )
}

export default Header