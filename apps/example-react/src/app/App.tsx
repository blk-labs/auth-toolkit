import Layout from './Layout';

// Test Error Boundary
// function BuggyComponent() {
//   throw new Error('This is a test error to verify our ErrorBoundary!');
//   return null;
// }

export default function App() {
  // const [hasError, setHasError] = useState(false);

  return (
    <Layout>
      <div>
        App
        {/* <button
          onClick={() => {
            setHasError(true);
          }}
        >
          Trigger Error Boundary
        </button>
        {hasError && <BuggyComponent />} */}
      </div>
    </Layout>
  );
}
