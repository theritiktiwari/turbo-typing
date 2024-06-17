export default function Home() {
  const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Turbo Typing";

  return (
    <div className="flex-center main-container h-[65vh] sm:h-[63vh] md:h-[70vh]">
      <div className="flex-center flex-col">
        <p className="text-5xl sm:text-7xl font-bold leading-tight text-center">
          <span className="relative inline-flex sm:inline">
            <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
            <span className="relative">{APP_NAME}</span>
          </span>
        </p>
        <p className="mt-6 text-muted-foreground text-md md:text-xl text-center font-medium">
          Unlock Your Typing Potential: Speed, Accuracy, Excellence.
        </p>
      </div>
    </div>
  );
}