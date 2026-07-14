import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner.tsx';

export function TrackedSpinner() {
    const isMutating = useIsMutating();
    const isFetching = useIsFetching();

    return <>{(isMutating > 0 || isFetching > 0) && <Spinner className="my-1 size-8 flex-none" />}</>;
}