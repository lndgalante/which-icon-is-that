import { md5 } from 'pure-md5';

export const createHash = (value: string): string => md5(value.replace(/\s/g, ''));
