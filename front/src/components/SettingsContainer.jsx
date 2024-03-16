import {Card, CardContent, CardHeader} from "@/components/ui/card.jsx";

export function SettingsContainer({title, children}) {

    return <Card>
        <CardHeader>{title}</CardHeader>
        <CardContent>{children}</CardContent>
    </Card>

}