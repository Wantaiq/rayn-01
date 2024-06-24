import { Register } from '@/pages';
import {
  createBrowserRouter,
  type RouteObject,
  RouterProvider,
} from 'react-router-dom';

const Router = () => {
  const publicRoutes: RouteObject[] = [
    {
      path: '/',
      children: [
        {
          path: 'register',
          element: <Register />,
        },
      ],
    },
  ];

  const router = createBrowserRouter([...publicRoutes]);

  return <RouterProvider router={router} />;
};

export default Router;
