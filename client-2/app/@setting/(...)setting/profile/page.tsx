"use client";

import Button from "@/components/common/Button";
import CenteredElement from "@/components/common/CenteredElement";
import Hover from "@/components/common/Hover";
import ImageButton from "@/components/common/ImageButton";
import SpanUpInput from "@/components/common/Input/SpanUp";
import StickyArea from "@/components/common/StickyArea";
import { useNotify } from "@/hooks/useNotify";
import { useProfile } from "@/hooks/useProfile";
import { setProfile } from "@/lib/feature/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateProfile } from "@/services/profileService";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { url } from "inspector";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export interface PageProps {}

export default function Page({}: Readonly<PageProps>) {
  const profile = useAppSelector((state) => state.auth.profile);

  const [headImage, setHeadImage] = useState(profile?.background);
  const [avatar, setAvatar] = useState(profile?.avatar);
  const [headFile, setHeadFile] = useState<File>();
  const [avatarFile, setAvatarFile] = useState<File>();
  const headRef = useRef(null);
  const avatarRef = useRef(null);
  const router = useRouter();
  const [updateProfileHook] = useProfile();
  const [showNotify] = useNotify();

  useEffect(() => {
    window.document.body.style.overflow = "hidden";

    return () => {
      window.document.body.style.overflow = "auto";
    };
  });

  useEffect(() => {
    let url: string;
    if (headFile) {
      url = URL.createObjectURL(headFile);
      setHeadImage(url);
    }

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [headFile]);

  useEffect(() => {
    let url: string;
    if (avatarFile) {
      url = URL.createObjectURL(avatarFile);
      setAvatar(url);
    }

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [avatarFile]);

  const handleOnChangeHeadImageClicked = async () => {
    if (headRef.current) {
      const element = headRef.current as HTMLInputElement;
      element.click();
    }
  };

  const handleChangeHeadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (file) {
      setHeadFile(file);
    }
  };

  const handleOnChangeAvatarClicked = async () => {
    if (avatarRef.current) {
      const element = avatarRef.current as HTMLInputElement;
      element.click();
    }
  };

  const handleChangeAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (file) {
      setAvatarFile(file);
    }
  };

  const onSubmitChange = async () => {
    console.log("head", headFile);
    console.log("avatar", avatarFile);

    const resp = await updateProfile({
      avatar: avatarFile,
      background: headFile,
    });
    console.log("resp", resp);

    setHeadFile(undefined);
    setAvatarFile(undefined);

    showNotify("profile updated");
    updateProfileHook(resp);
    router.back();
  };

  if (!headImage || !profile || !avatar) {
    return;
  }

  return (
    <div className="fixed h-screen w-screen bg-black/75 z-20 overflow-hidden">
      <CenteredElement>
        <div className="w-1/2 h-1/2 bg-white flex flex-col absolute rounded-md overflow-hidden">
          <form
            className="overflow-y-scroll overflow-x-hidden"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitChange();
            }}
          >
            <div>
              <StickyArea className="flex flex-row items-center justify-between p-2 border-b bg-white/80">
                <ImageButton
                  onClick={() => {
                    router.back();
                  }}
                  image={<XMarkIcon height={20} width={20} />}
                />
                Edit Profile
                <Button
                  className="bg-blue-400"
                  type="submit"
                  background="primary"
                >
                  Save
                </Button>
              </StickyArea>

              <div className="flex">
                <Hover
                  hover={
                    <ImageButton
                      className="bg-black/20 hover:bg-black/60 p-3"
                      onClick={handleOnChangeHeadImageClicked}
                      image={
                        <PencilSquareIcon
                          width={24}
                          height={24}
                          color="white"
                        />
                      }
                    />
                  }
                >
                  <Image
                    alt="head image"
                    src={headImage}
                    width={0}
                    height={0}
                    sizes="100%"
                    className="w-full h-96 object-cover object-top"
                  />
                  <input
                    ref={headRef}
                    onChange={handleChangeHeadImage}
                    type="file"
                    style={{ display: "none" }}
                  />
                </Hover>
              </div>
              <div
                className="px-4 flex h-fit w-fit relative"
                style={{ top: -48 }}
              >
                <Hover
                  hover={
                    <ImageButton
                      className="bg-black/20 hover:bg-black/60"
                      onClick={handleOnChangeAvatarClicked}
                      image={
                        <PencilSquareIcon
                          width={20}
                          height={20}
                          color="white"
                        />
                      }
                    />
                  }
                >
                  <Image
                    className="rounded-full overflow-hidden h-24 w-24 ring-4 ring-white"
                    alt="avatar"
                    src={avatar}
                    width={96}
                    height={96}
                  />
                  <input
                    ref={avatarRef}
                    onChange={handleChangeAvatar}
                    type="file"
                    style={{ display: "none" }}
                  />
                </Hover>
              </div>
              <div className="flex flex-col gap-2">
                <div className="p-2">
                  <SpanUpInput
                    onChange={() => {}}
                    lable="Name"
                    value={profile?.firstName}
                  />
                </div>
                <div className="p-2">
                  <SpanUpInput
                    onChange={() => {}}
                    lable="Bio"
                    value={"Something crazy"}
                  />
                </div>
                <div className="p-2">
                  <SpanUpInput
                    onChange={() => {}}
                    lable="Position"
                    value={"Vietnam"}
                  />
                </div>
                <div className="p-2">
                  <SpanUpInput
                    onChange={() => {}}
                    lable="Web"
                    value={"Nothing"}
                  />
                </div>
                <div className="p-2">
                  <SpanUpInput
                    onChange={() => {}}
                    type="date"
                    lable="Date of birth"
                    value={profile.dayOfBirth}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </CenteredElement>
    </div>
  );
}
