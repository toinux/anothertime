import {Card, CardContent, CardHeader} from "@/components/ui/card.jsx";

export function SettingsContainer({title, children}) {

    return <Card className={"m-4 sm:m-6 shadow-lg"}>
        <CardHeader className={"text-xl font-semibold py-2 sm:py-4"}>{title}</CardHeader>
        <CardContent className={"p-2 sm:p-6"}>{children}</CardContent>
    </Card>

}