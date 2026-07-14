import { Button } from '@/components/ui/button.tsx';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils.ts';

type MenuButtonProps = {
    className?: string;
} & ComponentProps<typeof Button>;
const MenuButton = ({ className, ...props }: MenuButtonProps) => {
    return (
        <Button size={'icon'} className={cn("size-10 [&_svg:not([class*='size-'])]:size-6", className)} {...props} />
    );
};
export default MenuButton;