import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.jsx';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

export default function Error({ error, resetErrorBoundary }) {
    return (
        <div className={'container grid h-screen content-center justify-center'}>
            <div>
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        <p>{error.toString()}</p>
                        <Button className={'mt-4'} variant={'destructive'} onClick={() => resetErrorBoundary()}>
                            Try again
                        </Button>
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    );
}
