var callback = (txt: string): string => {
  return txt;
};

export const Sum = (a: any, b: any): number => {
  return a + b;
};

export const Text = (callback: Function, input: string): void => {
  console.log(callback(input));
};
