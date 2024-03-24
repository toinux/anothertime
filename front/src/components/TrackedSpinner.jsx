import { Spinner } from '@/components/Spinner.jsx';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

export function TrackedSpinner({ className }) {
    const isMutating = useIsMutating();
    const isFetching = useIsFetching();

    return (
        <>
            {(isMutating > 0 || isFetching > 0) && (
                <Spinner className={className} />
            )}
        </>
    );
}
