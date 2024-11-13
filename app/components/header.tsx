import React from 'react'
import Image, { StaticImageData } from 'next/image';

interface HeaderProps {
    img_src: StaticImageData;
    desc: React.ReactNode;
    res: string
}

const Header: React.FC<HeaderProps> = ({ img_src, desc, res }) => {
    return (
        <>
            <div className="header">
                <Image
                    src={img_src}
                    alt="img"
                    className="hd_img"
                    priority={true}
                    width={490}
                    height={190}
                />
                <div className="hd_desc">
                    {desc}
                </div>
            </div>
            <div className="pgres">{res}</div>
        </>
    )
}

export default Header