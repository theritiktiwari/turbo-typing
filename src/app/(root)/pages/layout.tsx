export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="page-box">
                {children}
            </div>
        </>
    );
}