import { Spinner } from '@/components/ui/spinner.tsx';

export default function Loading() {
    return (
        <div className={'mx-auto grid h-screen max-w-7xl content-center justify-center px-4 md:px-8'}>
            <div>
                <Spinner className={'size-20'} />
            </div>
        </div>
    );
}