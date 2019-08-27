import s from 'slugify';

export const parse = text => encodeURI(text);
export const unparse = text => decodeURI(text);
export const slugify = s;
