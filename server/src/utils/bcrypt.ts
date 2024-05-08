import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const hash = async (str: string): Promise<string> => {
  const response = await bcrypt.hash(str, saltOrRounds);
  return response;
};

export const compareHash = async (
  data: string,
  hashString: string,
): Promise<boolean> => {
  const result = await bcrypt.compare(data, hashString);
  return result;
};
