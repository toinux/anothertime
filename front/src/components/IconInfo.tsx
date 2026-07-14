import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';

export default function IconInfo({ ...props }) {
    return (
        <Popover>
            <PopoverTrigger
                render={
                    <Button variant={'outline'} size={'icon'}>
                        <InfoIcon {...props} />
                    </Button>
                }
            ></PopoverTrigger>
            <PopoverContent>
                <span className={'text-sm'}>
                    To change icon, add a 8x8 gif in the
                    <span className={'text-nowrap'}>/ICONS</span> folder of your Awtrix file manager.
                </span>
            </PopoverContent>
        </Popover>
    );
}
