import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '@/components/ErrorBoundaryFallback.tsx';
import { Suspense } from 'react';
import Loading from '@/components/Loading.tsx';
import Home from '@/pages/Home.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@/context/theme-provider.tsx';
import { TooltipProvider } from '@/components/ui/tooltip.tsx';
import { Toaster } from '@/components/ui/sonner.tsx';

function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                staleTime: 60 * 1000,
                throwOnError: true
            }
        }
    });

    return (
        <ThemeProvider defaultTheme={'system'} storageKey={'anothertime-theme'}>
            <TooltipProvider>
                <Suspense fallback={<Loading />}>
                    <QueryClientProvider client={queryClient}>
                        <QueryErrorResetBoundary>
                            {({ reset }) => (
                                <ErrorBoundary onReset={reset} FallbackComponent={ErrorBoundaryFallback}>
                                    <Home />
                                    <Toaster position={'bottom-center'} richColors={true} />
                                </ErrorBoundary>
                            )}
                        </QueryErrorResetBoundary>
                        <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>
                </Suspense>
            </TooltipProvider>
        </ThemeProvider>
    );
}

export default App;
