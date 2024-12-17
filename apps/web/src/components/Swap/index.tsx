import React, { useState } from "react";


export default function Swap() {
    return (
        <>
            <div className="flex flex-col justify-center h-full">
                <div className="flex flex-col">
                    <div className="rounded-md p-4 h-[9rem]">
                        <div className="text-[16px]">Token</div>
                        <div className="w-full h-full">
                            <input className="w-[80%] h-full leading-[8rem] text-[3rem]" />
                        </div>
                    </div>
                    <div className="bg-[#fc72ff] hover:bg-[RGB(253,60,254)] p-[1px] h-[4rem] rounded-[20px] text-center cursor-pointer">
                        <button className="p-6 text-[#ffff]">
                            Get started
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
