import React from 'react'

export default function Spinner() {
    return (
        <div className="flex justify-center items-center h-[550px]">
            <svg
                className="spinner"
                height="100%"
                viewBox="0 0 32 32"
                width="100%"
            >
                <circle
                    cx="16"
                    cy="16"
                    fill="none"
                    r="10"
                    strokeWidth="1"
                    style={{ stroke: "rgb(255, 255, 255)", opacity: 0.2 }}
                ></circle>
                <circle
                    cx="16"
                    cy="16"
                    fill="none"
                    r="10"
                    strokeWidth="1"
                    style={{
                        stroke: "rgb(255, 255, 255)",
                        strokeDasharray: 80,
                        strokeDashoffset: 60,
                    }}
                ></circle>
            </svg>
        </div>
    )
}