import { CircleAlertIcon } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';
import { type FallbackProps, getErrorMessage } from 'react-error-boundary';

export default function ErrorBoundaryFallback({ error, resetErrorBoundary }: FallbackProps) {
    return (
        <div className={'flex h-screen items-center justify-center p-8'}>
            <Alert className={'md:max-w-lg'} variant="destructive">
                <CircleAlertIcon />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{getErrorMessage(error)}</AlertDescription>
                <AlertAction>
                    <Button size={'xs'} onClick={() => resetErrorBoundary()}>
                        Try again
                    </Button>
                </AlertAction>
            </Alert>
        </div>
    );
}