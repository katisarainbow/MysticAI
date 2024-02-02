import Link from "next/link";
import { HoverCardContent } from "../ui/hover-card";

const SpreadTypeCard = () => {
    return (
        <HoverCardContent>
            <div>
                <p className="text-sm text-gray-500">
                    This spread is a simple three card spread. It is a great
                    spread for beginners and can be used for a variety of
                    questions.
                </p>
                <Link
                    href="/spreads/three-cards"
                    className="text-sm text-amber-500 font-bold"
                >
                    Learn More...
                </Link>
            </div>
        </HoverCardContent>
    );
};

export default SpreadTypeCard;
