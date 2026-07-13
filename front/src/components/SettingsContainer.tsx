import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import type { ComponentProps } from 'react';

type SettingsContainerProps = {
    title: string;
} & ComponentProps<typeof Card>
export function SettingsContainer({ title, children, ...props }: SettingsContainerProps) {
    return (
        <Card className={'m-4 shadow-lg sm:m-6'} {...props}>
            <CardHeader>
                <CardTitle className={'text-xl font-semibold'}>{title}</CardTitle>
            </CardHeader>
            <CardContent className={'px-2 sm:px-6'}>{children}</CardContent>
        </Card>
    );
}
