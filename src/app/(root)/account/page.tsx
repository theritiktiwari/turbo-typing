import { GetCurrentUser } from "@/services/users";
import { getTestResults } from "@/services/tests";
import { AccountDetails } from "@/components/shared/AccountDetails";

export default async function Page() {
    const userResponse = await GetCurrentUser();
    // @ts-ignore
    const user = userResponse?.value;
    const testResponse = await getTestResults({ userId: user?._id.toString() });
    // @ts-ignore
    const tests = testResponse?.value;

    console.log({ user, test: tests[0] });

    const experienceProgress = (user?.experience / (user?.level * 200)) * 100;

    const time = tests?.map((test: any) => test?.duration).reduce((a: number, b: number) => a + b, 0);
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - (hours * 3600)) / 60);
    const seconds = time - (hours * 3600) - (minutes * 60);
    const testTiming = `${hours < 10 ? ("0" + hours) : hours} :
        ${minutes < 10 ? ("0" + minutes) : minutes} :
        ${seconds < 10 ? ("0" + seconds) : seconds}`;

    return (
        <div className="main-container">
            <AccountDetails
                user={user}
                experience={experienceProgress}
                tests={tests?.length}
                timing={testTiming}
            />

        </div>
    );
}