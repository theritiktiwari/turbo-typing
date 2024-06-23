export const TestDetails = ({ tests }: { tests: any }) => {
    const test15 = tests?.filter((test: any) => test?.duration === 15);
    const test30 = tests?.filter((test: any) => test?.duration === 30);
    const test60 = tests?.filter((test: any) => test?.duration === 60);

    // best accuray of all the time
    const bestAccuracy15 = test15.length > 0 ? test15?.reduce((a: any, b: any) => a.accuracy > b.accuracy ? a : b)?.accuracy + "%" : "-";
    const bestAccuracy30 = test30.length > 0 ? test30?.reduce((a: any, b: any) => a.accuracy > b.accuracy ? a : b)?.accuracy + "%" : "-";
    const bestAccuracy60 = test60.length > 0 ? test60?.reduce((a: any, b: any) => a.accuracy > b.accuracy ? a : b)?.accuracy + "%" : "-";

    // best speed of all the time
    const bestSpeed15 = test15.length > 0 ? test15?.reduce((a: any, b: any) => a.wpm > b.wpm ? a : b)?.wpm + " WPM" : "-";
    const bestSpeed30 = test30.length > 0 ? test30?.reduce((a: any, b: any) => a.wpm > b.wpm ? a : b)?.wpm + " WPM" : "-";
    const bestSpeed60 = test60.length > 0 ? test60?.reduce((a: any, b: any) => a.wpm > b.wpm ? a : b)?.wpm + " WPM" : "-";

    return (<>
        <div className="account__test-box">
            <div className="flex items-center justify-between md:justify-around gap-10">
                <div className="flex-center flex-col gap-2">
                    <p className="description-text">15 Seconds</p>
                    <h1 className="text-xl">{bestSpeed15}</h1>
                    <h1 className="text-lg">{bestAccuracy15}</h1>
                </div>

                <div className="flex-center flex-col gap-2">
                    <p className="description-text">30 Seconds</p>
                    <h1 className="text-xl">{bestSpeed30}</h1>
                    <h1 className="text-lg">{bestAccuracy30}</h1>
                </div>

                <div className="flex-center flex-col gap-2">
                    <p className="description-text">60 Seconds</p>
                    <h1 className="text-xl">{bestSpeed60}</h1>
                    <h1 className="text-lg">{bestAccuracy60}</h1>
                </div>

            </div>
        </div>
    </>)
}