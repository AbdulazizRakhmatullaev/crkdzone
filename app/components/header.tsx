import React from 'react'

interface HeaderProps {
    title: string;
    desc: string;
}

const Header: React.FC<HeaderProps> = ({ title, desc }) => {
    return (
        <>
            <div className="header">
                <div className='mb-3 pl-[10px] text-2xl uppercase font-HitConBlk'>{title}</div>
                <div className="hd_desc p-[10px] border-solid border border-[#2d2d2d]">
                    {desc}
                </div>
            </div>
        </>
    )
}

export default Header