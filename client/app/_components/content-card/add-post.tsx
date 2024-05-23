import Image from "next/image";
import { ContentCard, ContentCardHeader } from ".";
import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { MediaAdd } from "./media-add";
import { useAppSelector } from "@/app/_lib/hook";
import { ChooseScope } from "../scope-post";
import { useState } from "react";

type PostCreate = {
  text: string;
  type: string;
};

export function AddPost() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [postLoading, setPostLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState([] as any[]);
  const _initialValue: PostCreate = {
    text: "",
    type: "anyone",
  };
  const [post, setPost] = useState<PostCreate>(_initialValue);
  const setMultipleImage = (newImages: any[]) => {
    setSelectedImage([...selectedImage, ...newImages]);
  };
  const avatar = useAppSelector((state) => state.user.avatar);
  const token = useAppSelector((state) => state.user.token);

  const handleOnPost = async (onClose: () => void) => {
    setPostLoading(true);
    const formData = new FormData();
    formData.append("content", post.text);
    formData.append("auth", post.type);
    selectedImage.forEach((image) => {
      formData.append("files", image);
    });
    const result = await fetch("http://localhost:3001/posts/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (result.status == 201) {
      const data = await result.json();
      console.log(data);
      setPostLoading(false);
      setPost(_initialValue);
      onClose();
    }
  };

  return (
    <>
      <ContentCard>
        <div className="flex flex-row mb-2">
          <div className="relative w-12 h-12 grid">
            <Avatar
              src={avatar || "/person.svg"}
              className={
                "rounded-full border border-gray-100 shadow-sm self-center flex ring-2"
              }
            ></Avatar>
          </div>
          <div className="flex flex-row justify-between w-full px-2">
            <input
              type="button"
              placeholder="What do you think?"
              className="w-full bg-contentbg text-start rounded-full px-4"
              value={"What do you think?"}
              onClick={onOpen}
            ></input>
          </div>
        </div>
      </ContentCard>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-b-2">
                <div>
                  <h1>Create post</h1>
                </div>
              </ModalHeader>
              <ModalBody>
                <ContentCardHeader
                  avatar={avatar}
                  subTitle={<ChooseScope />}
                  title="WD"
                  ring
                  closeButton={false}
                />
                <div>
                  <Textarea
                    value={post.text}
                    onChange={(e) => setPost({ ...post, text: e.target.value })}
                    type="text"
                    placeholder="What do you think?"
                  ></Textarea>

                  {selectedImage.length > 0 && (
                    <div>
                      <div className="grid grid-cols-2">
                        {selectedImage.map((image, i) => (
                          <Image
                            width={200}
                            height={200}
                            objectFit="cover"
                            key={i}
                            alt="not found"
                            src={URL.createObjectURL(image)}
                          />
                        ))}
                      </div>
                      <button onClick={() => setSelectedImage([])}>
                        Remove
                      </button>
                    </div>
                  )}
                </div>
                <MediaAdd setSelectedImage={setMultipleImage} />
              </ModalBody>
              <ModalFooter>
                <Button
                  isLoading={postLoading}
                  color="primary"
                  onPress={() => handleOnPost(onClose)}
                  className="w-full hover:bg-primary-hover bg-primary"
                  spinner={
                    <svg
                      className="animate-spin h-5 w-5 text-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        fill="currentColor"
                      />
                    </svg>
                  }
                >
                  Post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
