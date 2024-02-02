import { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "../ui/command";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";

type Card = {
    title: string;
    description: string;
    src: StaticImageData;
    alt: string;
    value: string;
};

const SelectCard = ({ card, form }: { card: Card; form: any }) => {
    const [tarotCards, setTarotCards] = useState<any[]>([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://tarotapi.dev/api/v1/cards/")
            .then((response) => response.json())
            .then((data) => {
                setTarotCards(data.cards);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const filteredCards = tarotCards.filter((card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {!loading ? (
                <FormField
                    control={form.control}
                    name={card.value}
                    render={({ field }) => (
                        <FormItem>
                            <Popover>
                                <FormControl className="w-1/2">
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className="w-full justify-between"
                                        >
                                            {field.value
                                                ? tarotCards.find(
                                                      (tarotCard: any) =>
                                                          tarotCard.name ===
                                                          field.value
                                                  )?.name
                                                : "Select a card"}
                                        </Button>
                                    </PopoverTrigger>
                                </FormControl>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <Input
                                            placeholder="Search card..."
                                            onChange={(e: any) =>
                                                setSearchTerm(e.target.value)
                                            }
                                        />
                                        <ScrollArea className="h-72">
                                            <CommandEmpty>
                                                No card found.
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {filteredCards.map(
                                                    (tarotCard: any) => (
                                                        <CommandItem
                                                            className="cursor-pointer"
                                                            value={card.value}
                                                            key={tarotCard.name}
                                                            onSelect={() => {
                                                                form.setValue(
                                                                    card.value,
                                                                    tarotCard.name
                                                                );
                                                                console.log(
                                                                    card.value,
                                                                    tarotCard.name
                                                                );
                                                            }}
                                                        >
                                                            {tarotCard.name}
                                                        </CommandItem>
                                                    )
                                                )}
                                            </CommandGroup>
                                        </ScrollArea>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            <FormMessage />
                        </FormItem>
                    )}
                />
            ) : null}
        </>
    );
};

export default SelectCard;
