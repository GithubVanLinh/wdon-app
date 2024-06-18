"use client";

import CenteredElement from "@/components/common/CenteredElement";
import ImageButton from "@/components/common/ImageButton";
import SizeAnimate from "@/components/common/SizeAnimateCard";
import LoginForm from "@/components/specific/LoginForm";
import SignInForm from "@/components/specific/SignInForm";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export interface LoginPageProps {}

export default function LoginPage({}: Readonly<LoginPageProps>) {
  const [open, setOpen] = useState(false);
  const onOpenClick = () => {
    setOpen(!open);
  };
  return (
    <div className="h-screen w-screen">
      <CenteredElement>
        <div className="flex lg:flex-row">
          <div>
            <CenteredElement>
              <SizeAnimate size={open ? 0 : 500}>
                <LoginForm />
              </SizeAnimate>
              {!open ? (
                <ImageButton
                  onClick={onOpenClick}
                  image={<ChevronRightIcon width={24} height={24} />}
                />
              ) : (
                ""
              )}
            </CenteredElement>
          </div>
          <div>
            <CenteredElement>
              {open ? (
                <ImageButton
                  onClick={onOpenClick}
                  image={<ChevronLeftIcon width={24} height={24} />}
                />
              ) : (
                ""
              )}

              <SizeAnimate size={open ? 700 : 0}>
                <SignInForm />
              </SizeAnimate>
            </CenteredElement>
          </div>
        </div>
      </CenteredElement>
    </div>
  );
}
