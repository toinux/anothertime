import { queryOptions } from '@tanstack/react-query';
import { anothertimeConfigSchema } from '@/types/config.ts';
import { api } from '@/lib/api.ts';

export const configQueries = {
    all: () => ['config'] as const,
    get: () =>
        queryOptions({
            queryKey: configQueries.all(),
            queryFn: () => api.get('/config').json(anothertimeConfigSchema)
        })
};