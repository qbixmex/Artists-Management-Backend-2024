export const isValidUUID = (uuid: string) => {
  const regex = /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-4[0-9a-fA-F]{3}\-(8|9|a|b)[0-9a-fA-F]{3}\-[0-9a-fA-F]{12}$/;
  return regex.test(uuid);
};
