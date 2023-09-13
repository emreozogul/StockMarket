import bcrypt, { compare } from "bcrypt";

export async function hash(password) {
  bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      console.error("Error hashing password:", err);
      return null;
    } else {
      console.log("Hashed password:", hash);
      return hash;
    }
  });
}

export async function verifyPassword(password, hash) {
  bcrypt.compare(password, hash, function (err, result) {
    if (err) {
      console.error("Error verifying password:", err);
      return null;
    } else {
      console.log("Password verified:", result);
      return result;
    }
  });
}

export async function isPasswordValid(password, hash) {
  return await compare(password, hash);
}
