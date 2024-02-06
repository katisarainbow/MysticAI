import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const UpgradeButton = () => {
    return (
        <Button className="w-full">
            Upgrade Now <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
    );
};

export default UpgradeButton;
