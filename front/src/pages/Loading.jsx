import {Spinner} from "@/components/Spinner.jsx";

export default function Loading() {
    return <div className={'container grid h-screen content-center justify-center'}>
        <div>
            <Spinner className={'size-20'}/>
        </div>
    </div>;
}