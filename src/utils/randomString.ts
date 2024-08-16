type RandomStringType = (start?: number, end?: number) => string;

const randomString: RandomStringType = (start = 2, end = 11) =>
  Math.random().toString(36).slice(start, end);
export default randomString;
