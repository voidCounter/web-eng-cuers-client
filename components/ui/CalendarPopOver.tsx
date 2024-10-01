"use client";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import {useState} from "react";
import {formatDateString} from "@/utils/formatDate";

interface CalendarPopOverProps {
    value: string
}

export function CalendarPopOver({value = ""}: CalendarPopOverProps) {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(value));
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                >
                    {
                        value ? formatDateString(selectedDate) :
                            <span>Pick a date</span>
                    }
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    defaultMonth={selectedDate}
                    onSelect={() => {
                    }}
                    disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}