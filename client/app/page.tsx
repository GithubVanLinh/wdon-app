"use client";

import { useRouter } from "next/navigation";
import { Button, Card, ContentCard, ContentCardHeader } from "./_components";
import { useEffect } from "react";
import { AddPost } from "./_components/content-card/add-post";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Button as UIButton,
  Textarea,
} from "@nextui-org/react";
import Image from "next/image";
import Home from "./_components/home";
import { Friend } from "./_components/friend";
import { useAppSelector } from "./_lib/hook";

export default function Dashboard() {
  const router = useRouter();

  const page = useAppSelector((state) => state.dashboard.target);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  });
  if (typeof window === "undefined") {
    return <div></div>;
  }
  if (page === "home") {
    return <Home />;
  } else {
    return <Friend />;
  }
}
