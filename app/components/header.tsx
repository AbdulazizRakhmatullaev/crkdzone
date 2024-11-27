import React from 'react'

interface HeaderProps {
    title: string;
    desc: string;
}

const Header: React.FC<HeaderProps> = ({ title, desc }) => {
    return (
        <>
            <div className="p-[10px] header border border-[#2d2d2d]">
                <div className='mb-3 text-xl uppercase font-HitConBlk'>{title}</div>
                <div className="hd_desc text-[#959595]">
                    {desc}
                </div>
            </div>
        </>
    )
}

export default Header