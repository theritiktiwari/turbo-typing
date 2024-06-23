import { GetCurrentUser } from "@/services/users";
import { getTestResults } from "@/services/tests";
import { AccountDetails } from "@/components/shared/AccountDetails";
import { TestDetails } from "@/components/shared/TestDetails";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function Page() {
    const userResponse = await GetCurrentUser();
    if (!userResponse?.success) {
        redirect("/auth");
    }
    // @ts-ignore
    const user = userResponse?.value;
    const testResponse = await getTestResults({ userId: user?._id.toString() });
    // @ts-ignore
    const tests = testResponse?.value;

    const experienceProgress = (user?.experience / (user?.level * 200)) * 100;

    const time = tests?.map((test: any) => test?.duration).reduce((a: number, b: number) => a + b, 0);
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - (hours * 3600)) / 60);
    const seconds = time - (hours * 3600) - (minutes * 60);
    const testTiming = `${hours < 10 ? ("0" + hours) : hours} :
        ${minutes < 10 ? ("0" + minutes) : minutes} :
        ${seconds < 10 ? ("0" + seconds) : seconds}`;

    return (
        <div className="main-container h-[65vh] sm:h-[63vh] md:h-[70vh]">
            <AccountDetails
                user={user}
                experience={experienceProgress}
                tests={tests?.length}
                timing={testTiming}
            />

            <TestDetails tests={tests} />
        </div>
    );
}