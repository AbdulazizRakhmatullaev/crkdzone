import React from 'react'
import Image from 'next/image';

export default function Error() {
    return (
        <div className='flex flex-col justify-center items-center px-5 h-full bg-black'>
            <Image
                src="/noUsername.jpg"
                alt="img"
                priority={true}
                
                width={250}
                className='mb-10'
            />
            <div className='text-xl uppercase'>Soldier</div>
            <div className="text-center">
                We are sorry for the inconvenience,
                <br /> We are working on this issue, you can come back later.
            </div>
        </div>
    )
}
