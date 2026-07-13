import ky from 'ky';

export const api = ky.extend({
    retry: 0
});
