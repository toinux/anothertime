import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover.jsx';
import { Info } from 'lucide-react';

export default function IconInfo({ ...props }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Info {...props} />
            </PopoverTrigger>
            <PopoverContent>
                <span className={'text-sm'}>
                    To change icon, add a 8x8 gif in the
                    <span className={'text-nowrap'}>/ICONS</span> folder of your
                    Awtrix file manager.
                </span>
            </PopoverContent>
        </Popover>
    );
}
