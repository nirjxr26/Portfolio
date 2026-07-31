import { ICON_VERSIONS } from "./icon-versions.generated";

export function iconUrl(path: string): string {
  const v = ICON_VERSIONS[path];
  return v ? `${path}?v=${v}` : path;
}
