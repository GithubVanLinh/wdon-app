const convertToValidURL = (url: string) => {
  const urlL = url.split("\\");
  const turl = [urlL[0], "\\", ...urlL.slice(1)].join("\\");
  return turl;
};

export { convertToValidURL };
