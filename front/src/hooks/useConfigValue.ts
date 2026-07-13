import type { ConfigPath, ConfigPathValue } from '@/types/config.ts';
import get from 'lodash/get';
import { useSuspenseQuery } from '@tanstack/react-query';
import { configQueries } from '@/queries/config.ts';

export const useConfigValue = <P extends ConfigPath>(path: P) => {
    const { data: config } = useSuspenseQuery(configQueries.get());
    // Pas le choix pour le 'as' ici, mais dans on a au moins validé le type avec zod dans la query.
    return get(config, path) as ConfigPathValue<P>;
};
