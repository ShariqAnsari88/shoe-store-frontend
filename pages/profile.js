import React, { useState } from "react";
import Wrapper from "@/components/Wrapper";
import AuthSelector from "@/components/profile/AuthSelector";
import SignUp from "@/components/profile/SignUp";
import { logOut } from "@/utils/auth";
import { getUser } from "@/store/contexts/userContext";

function ProfilePage(props) {
  const { user } = props;
  const [choice, setChoice] = useState("login");
  const handleChoice = () => setChoice("signup");

  if (user)
    return (
      <div className="min-h-[650px] mt-8 flex">
        <Wrapper>
          <div className="flex flex-col gap-10 h-full">
            <div className="font-bold text-[20px]">{`Hello ${user.username} !`}</div>
            <div className="p-6 md:max-w-xl bg-gray-100">
              <div className="flex flex-row items-center">
                <p className="text-xl text-gray-800 font-semibold leading-5 mt-6">
                  Your address
                </p>
              </div>
              <p className=" font-normal text-base leading-6 text-gray-600 my-4">
                ul. "Bulgaria" 30
              </p>
            </div>
            <button
              onClick={logOut}
              className={`hover:opacity-80 transition-opacity ease-in-out md:mr-auto md:ml-0 min-h-[50px] bg-[#151718] rounded-[4px] md:max-w-[450px] w-full text-white`}
              type="button"
            >
              Log out
            </button>
          </div>
        </Wrapper>
      </div>
    );

  return (
    <div className="min-h-[650px] mt-8 flex">
      <Wrapper>
        {choice === "login" && (
          <AuthSelector choice={choice} setChoice={handleChoice} />
        )}
        {choice === "signup" && <SignUp />}
      </Wrapper>
    </div>
  );
}

export default ProfilePage;

export async function getServerSideProps(ctx) {
  let user = getUser(ctx);

  return {
    props: {
      user,
    },
  };
}
