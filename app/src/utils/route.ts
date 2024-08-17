import { interpolate } from './interpolate';

export function createRoute(routes: string[], params: { [key: string]: string | number } = {}) {
  return `/${interpolate(routes.join('/'), params)}`;
}
