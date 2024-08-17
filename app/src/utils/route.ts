import { interpolate } from './interpolate';

export function createRoute(
  routes: string[],
  params: { [key: string]: string | number } = {}
): string {
  if (routes.length === 0) {
    return '/';
  }

  // Clean up any leading '/' from the first route segment
  const cleanedRoutes = routes.map((route, index) => {
    return index === 0 && route.startsWith('/') ? route.substring(1) : route;
  });

  // Join the routes and interpolate parameters
  const path = cleanedRoutes.join('/');
  const interpolatedPath = interpolate(path, params);

  return `/${interpolatedPath}`;
}
