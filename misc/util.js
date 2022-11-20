const {sign, verify} = require('jsonwebtoken');
const {matchesStructure} = require('validate-structure');
const secret = 'sjdfisudfisdyfo';

async function encodeToken (data) {
    return await sign(data, secret);
};

async function decodeToken (token) {
    return await verify(token, secret)
}

async function validEmail (email) {
    return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
}

async function validObject (original, clone) {
    const res = await matchesStructure(clone, original, true);
    return res;
}

module.exports = {
    encodeToken: encodeToken,
    decodeToken: decodeToken,
    validEmail: validEmail,
    validObject: validObject
}