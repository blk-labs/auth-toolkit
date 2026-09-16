import { RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import { router } from './routes';

// Test Error Boundary
// function BuggyComponent() {
//   throw new Error('This is a test error to verify our ErrorBoundary!');
//   return null;
// }

export default function App() {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}
