import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api.ts';
import { type AnothertimeConfig, anothertimeConfigSchema } from '@/types/config.ts';
import { configQueries } from '@/queries/config.ts';
import { merge } from 'lodash';
import type { DeepPartial } from '@/lib/config-utils.ts';
import { toast } from 'sonner';
import { HTTPError } from 'ky';

export const useConfigMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['config'],
        mutationFn: (partial: DeepPartial<AnothertimeConfig>) =>
            api
                .post('/config', {
                    json: partial
                })
                .json(anothertimeConfigSchema),
        onMutate: async (partial) => {
            await queryClient.cancelQueries(configQueries.get());

            const previous = queryClient.getQueryData(configQueries.get().queryKey);

            queryClient.setQueryData(configQueries.get().queryKey, (old) => merge({}, old, partial));

            return { previous };
        },

        onError: (err, _args, context) => {
            queryClient.setQueryData(configQueries.get().queryKey, context?.previous);
            toast.error(`Could not update config : ${err.message}`);
        },
        // version qui invalidate le cache pour recharger apres mutation
        /*        onSettled: async () => {
            await queryClient.invalidateQueries(configQueries.get());
        }*/

        // version qui update le cache avec la nouvelle config en réponse du post /config
        onSuccess: (data) => {
            queryClient.setQueryData(configQueries.get().queryKey, data);
        }
    });
};

export const useSaveMutation = () =>
    useMutation({
        mutationKey: ['save'],
        mutationFn: async () =>
            toast.promise(api.post('/save'), {
                loading: 'Saving settings...',
                error: (data) => {
                    if (data instanceof HTTPError) {
                        return `Impossible to save settings : ${data.message}`;
                    } else {
                        return 'Impossible to save settings';
                    }
                },
                success: 'Settings saved !'
            })
    });
export const useReloadMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['reload'],
        mutationFn: async () =>
            /*api.post('/load').json(anothertimeConfigSchema),*/
            toast.promise(api.post('/load').json(anothertimeConfigSchema), {
                loading: 'Reloading settings...',
                error: (data) => {
                    if (data instanceof HTTPError) {
                        return `Impossible to load settings : ${data.message}`;
                    } else {
                        return 'Impossible to load settings';
                    }
                },
                success: (data) => {
                    queryClient.setQueryData(configQueries.get().queryKey, data);
                    return 'Settings reloaded !';
                }
            })
    });
};
