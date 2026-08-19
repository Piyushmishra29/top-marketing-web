// next.config's basePath only rewrites next/link and next/image. Everything we
// hand-roll (poster tiles, client logos, service art) has to be prefixed here.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${BASE}${path}`;
