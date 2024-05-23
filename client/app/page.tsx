"use client";

import { useRouter } from "next/navigation";
import { Button, Card, ContentCard, ContentCardHeader } from "./_components";
import { lazy, useEffect, useState } from "react";
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
// import Home from "./_components/home";
import { Friend } from "./_components/friend";
import { useAppSelector } from "./_lib/hook";
import Loading from "./_components/loading";

const Home = lazy(() => import("./_components/home"));

export default function Dashboard() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const page = useAppSelector((state) => state.dashboard.target);
  // useEffect(() => {
  //   console.log("in dashboard");
  //   const token = localStorage?.getItem("token");
  //   if (!token) {
  //     router.push("/login");
  //   }
  // });
  setTimeout(() => setShow(true), 300);
  return (
    <div>{show ? page === "home" ? <Home /> : <Friend /> : <Loading />}</div>
  );
}
