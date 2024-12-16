import { useProfileStore } from "@/store/useProfileStore";
import { useShallow } from "zustand/react/shallow";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useEffect, useState } from "react";

const AvatarComponent = () => {
    const [userAddress, setAddress] = useProfileStore(
        useShallow(
            (state) => [state.userAddress, state.setAddress],
        ),
    );

    return (
        <>
            <div className="flex md:flex-col flex-row">
                <div className="w-full h-auto">
                    {
                        /* <img
                        className="rounded-full"
                        src="https://avatars.githubusercontent.com/u/116348059?v=4"
                    /> */
                    }
                    <Jazzicon
                        paperStyles={{
                            borderRadius: "50%",
                        }}
                        diameter={400}
                        seed={jsNumberForAddress(userAddress)}
                    />
                </div>
                <div className="vcard-names flex items-center">
                    <span className="text-[1.5rem] leading-tight">
                        mrlonely
                    </span>
                    <span></span>
                </div>
            </div>
        </>
    );
};

export default AvatarComponent;
