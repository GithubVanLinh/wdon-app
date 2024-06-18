const toLocalDateTime = (str: string) => {
  const date = new Date(str);

  const today = new Date();
  const localTodayString = today.toLocaleDateString();
  return (
    date.toLocaleTimeString() +
    (localTodayString == date.toLocaleDateString()
      ? " " + date.toLocaleDateString()
      : "")
  );
};

const toLocalDate = (str: string) => {
  const date = new Date(str);
  return date.toLocaleDateString();
};

export { toLocalDateTime, toLocalDate };
