import bycrypt from 'bcrypt';

export const createHash = (password) => {
    return bycrypt.hashSync(password, bycrypt.genSaltSync(10));
};

export const isValidPassword = (passwordPlain, passwordHash) => {
    return bycrypt.compareSync(passwordPlain, passwordHash);
};
