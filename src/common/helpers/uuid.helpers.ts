import * as _uuid from 'uuid';
const UUID_NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
export function uuid(seed: string): string {
  return _uuid.v5(seed, UUID_NAMESPACE);
}
