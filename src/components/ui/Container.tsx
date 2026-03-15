export default function Container({children, className}: {children: React.ReactNode, className?: string}) {
    return (
        <div className={`container mx-auto max-w-6xl p-2 ${className}`}>
            {children}
        </div>
    );
}