import { queryOptions } from '@tanstack/react-query';
import { api } from '@/lib/api.ts';

type Icon = {
    name: string;
    url: string;
};
export const iconQueries = {
    all: () => ['icons'] as const,
    get: () =>
        queryOptions({
            queryKey: iconQueries.all(),
            queryFn: () => api.get('/icons').json<Icon[]>()
        })
};
