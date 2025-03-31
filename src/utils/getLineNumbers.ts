export const getLineNumbers = (code: string) => {
  const lines = code.split("\n");
  return lines.map((_, index) => index + 1);
};
