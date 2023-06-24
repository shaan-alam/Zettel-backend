import bcrypt from 'bcrypt';

export const hashPassword = async (candidatePassword: string) => {
  return await bcrypt.hash(candidatePassword, 12);
}

export const comparePassword = async (password: string, candidatePassword: string) => {
  return await bcrypt.compare(password, candidatePassword);
}