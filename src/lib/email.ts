const decode = (s: string) => Buffer.from(s, "base64").toString("utf-8");

export const MAILTO = decode("bWFpbHRvOm5pcmphcmdvc3dhbWkyNjI2QGdtYWlsLmNvbQ==");
