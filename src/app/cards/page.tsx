import Cards from "@/components/cards/Cards";
import { getUserSubscriptionPlan } from "@/lib/stripe";

const Page = async () => {
    const subscriptionPlan = await getUserSubscriptionPlan();
    return <Cards subscriptionPlan={subscriptionPlan} />;
};

export default Page;
