import { QueryClient, QueryClientProvider, useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Home from '@/pages/Home.jsx';
import { ToastContainer } from 'react-toastify';
import ToastCloseButton from '@/components/ToastCloseButton.jsx';
import { Suspense } from 'react';
import Loading from '@/pages/Loading.jsx';
import Error from '@/pages/Error.jsx';
import { ErrorBoundary } from 'react-error-boundary';

function App() {
    const queryClient = new QueryClient();
    const { reset } = useQueryErrorResetBoundary();

    return (
        <Suspense fallback={<Loading />}>
            <QueryClientProvider client={queryClient}>
                <ToastContainer
                    position="bottom-center"
                    autoClose={2000}
                    closeButton={ToastCloseButton}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                <ErrorBoundary FallbackComponent={Error} onReset={reset}>
                    <Home />
                </ErrorBoundary>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </Suspense>
    );
}

export default App;
