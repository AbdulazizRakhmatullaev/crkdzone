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
                <Image
                    src={img_src}
                    alt="img"
                    className="hd_img"
                    priority={true}
                    width={490}
                    height={175}
                />
                <div className='text-center my-3 text-3xl uppercase font-HitConBlk'>{title}</div>
                <div className="hd_desc text-center">
                    {desc}
                </div>
            </div>
        </>
    )
}

export default Header