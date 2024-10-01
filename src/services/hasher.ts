import crypto from 'crypto';

function hashPassword(plainText: string): { salt: string; passwordHashed: string } {
  const salt: string = crypto.randomBytes(32).toString('hex');
  const hashObject = crypto.createHash('sha256');
  const passwordHashed: string = hashObject.update(plainText + salt).digest('hex');
  return { salt, passwordHashed };
}

function hashPasswordSalt(salt: string, plainText: string): string {
  const hashObject = crypto.createHash('sha256');
  return hashObject.update(plainText + salt).digest('hex');
}

export { hashPassword, hashPasswordSalt };
