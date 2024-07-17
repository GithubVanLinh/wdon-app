import apiConfig from "@/config/apiConfig";
import { get, post } from "@/utils/api";
import { ApiResponse } from "@/utils/type/api";
import { Conversation, Message } from "@/utils/type/conversation";

const getListConversation = async () => {
  const data: ApiResponse<Conversation[]> = await get(
    apiConfig.endpoints.getListConversation
  );
  return data.data;
};

const getListMessageFromConversation = async (id: string) => {
  const data: ApiResponse<Message[]> = await get(
    apiConfig.endpoints.getListMessageInConversation(id)
  );
  return data.data;
};

const createConversation = async (id: string) => {
  const data: ApiResponse<Conversation> = await post(
    apiConfig.endpoints.createConversation,
    {
      participants: [
        {
          profile: id,
        },
      ],
    }
  );
  return data.data;
};

export {
  getListConversation,
  getListMessageFromConversation,
  createConversation,
};
