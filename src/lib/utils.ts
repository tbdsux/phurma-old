type ObjectProps = { [key: string]: string };

const joinString = (str: string | string[]) => {
  return Array.isArray(str) ? str.join('') : str;
};

export { joinString };
export type { ObjectProps };
