import {useQuery} from "@tanstack/react-query";
import ky from 'ky';

/**
 *
 * @returns {string[]} icons
 */
const fetchIcons = () => ky.get("/icons").json();

export default function useIcons() {
    return useQuery({
        queryKey: ["icons"],
        queryFn: fetchIcons,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60,
        placeholderData: []
    });
}
