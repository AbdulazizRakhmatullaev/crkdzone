import React from 'react'
import Image, { StaticImageData } from 'next/image';

interface HeaderProps {
    img_src: StaticImageData;
    title: string;
    desc: string;
    res: string
}

const Header: React.FC<HeaderProps> = ({ img_src, title, desc, res }) => {
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
                <div className="fl items-center mt-5 font-HitConBlk">
                    <div className='text-2xl uppercase'>{title}</div>
                    <Image
                        src="/stripe.png"
                        alt="stripe"
                        className='hdstp'
                        priority={true}
                        width={1000}
                        height={20}
                    />
                </div>
                <div className="hd_desc">
                    {desc}
                </div>
            </div>
            <div className="pgres">{res}</div>
        </>
    )
}

export default Header