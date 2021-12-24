export const isNotEmptyString = value => Boolean(value);
export const isEmail = (email) => {
  const re = /^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,4}$/i;
  return re.test(email)
};