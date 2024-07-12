import apiConfig from "@/config/apiConfig";
import { post } from "@/utils/api";
import { ApiResponse } from "@/utils/type/api";
import { Message } from "@/utils/type/conversation";

const sendMessage = async (to: string, message: string) => {
  const res: ApiResponse<Message> = await post(
    apiConfig.endpoints.sendMessage,
    {
      conversation_id: to,
      message,
    }
  );
  return res.data;
};

export { sendMessage };
