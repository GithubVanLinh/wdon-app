import { CardContentOptions } from "..";

export const post: CardContentOptions[] = [
  {
    border: true,
    header: {
      avatar:
        "data:image/png;base64,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",
      subTitle: "20:20",
      title: "WDON",
      actionStatus: true,
      ring: true,
    },
    children: "hiiiii",
  },
  {
    border: false,
    header: {
      avatar:
        "https://ila.edu.vn/wp-content/uploads/2023/10/cach-dung-some-va-any-1.jpg",
      subTitle: "15:30",
      title: "linh vo",
    },
    children: "buon v troi",
  },
  {
    border: false,
    header: {
      avatar:
        "https://ila.edu.vn/wp-content/uploads/2023/10/cach-dung-some-va-any-1.jpg",
      subTitle: "15:30",
      title: "linh vo",
    },
    children: "too sad",
  },
  {
    border: false,
    header: {
      avatar:
        "https://ila.edu.vn/wp-content/uploads/2023/10/cach-dung-some-va-any-1.jpg",
      subTitle: "15:30",
      title: "linh vo",
    },
    children: "muon di choi",
  },
];