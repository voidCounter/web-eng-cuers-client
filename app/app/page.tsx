import {CircleOffIcon} from "lucide-react";

export default function Home() {
    return (<div className={"w-full h-full flex flex-col" +
        " justify-center" +
        " items-center text-muted-foreground gap-8"}>
        <CircleOffIcon className={"h-32 w-32 text-muted-foreground/40"}/>
        <span className={"text-2xl"}>Select options from sidebar to
            view data</span></div>);
}