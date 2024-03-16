import {Card, CardContent, CardHeader} from "@/components/ui/card.jsx";

export function SettingsContainer({title, children}) {

    return <Card className={"m-6 shadow-lg"}>
        <CardHeader className={"text-xl font-semibold"}>{title}</CardHeader>
        <CardContent>{children}</CardContent>
    </Card>

}