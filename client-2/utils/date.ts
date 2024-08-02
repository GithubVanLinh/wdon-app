const toLocalDateTime = (str: string, options?: { noSecond?: boolean }) => {
  const date = new Date(str);

  const today = new Date();
  const localTodayString = today.toLocaleDateString();
  const time = options?.noSecond
    ? date.toLocaleTimeString().slice(0, 4)
    : date.toLocaleTimeString();
  return (
    time +
    (localTodayString == date.toLocaleDateString()
      ? " " + date.toLocaleDateString()
      : "")
  );
};

const toLocalDate = (str: string) => {
  const date = new Date(str);
  return date.toLocaleDateString();
};

const timeFromToday = (date: Date | string) => {
  let _date: Date;
  if (typeof date === "string") {
    _date = new Date(date);
  } else {
    _date = date;
  }

  const today = new Date();
  const diff = today.getTime() - _date.getTime();

  const sec = Math.floor(diff / 1000);
  const minute = Math.floor(sec / 60);
  const hour = Math.floor(minute / 60);
  const day = Math.floor(hour / 24);

  if (day > 0) {
    return `${day} day ago`;
  }

  if (hour > 0) {
    return `${hour}h ago`;
  }

  if (minute > 0) {
    return `${minute}min ago`;
  }

  return `${sec}sec ago`;
};

export { toLocalDateTime, toLocalDate, timeFromToday };
