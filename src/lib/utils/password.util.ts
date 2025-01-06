import bcrypt from 'bcryptjs';

export const isCorrectPassword = async function (
  pass: string,
  hashedPassword: string
) {
  return await bcrypt.compare(pass, hashedPassword);
};
