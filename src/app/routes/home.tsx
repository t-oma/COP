import { HomePage } from '~/pages/home/home';
import type { Route } from './+types/home';

// eslint-disable-next-line
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function HomeRoute() {
  return <HomePage />;
}
