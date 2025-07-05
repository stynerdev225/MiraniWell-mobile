interface PageWrapperProps {
    children: React.ReactNode;
    className?: string;
}

const PageWrapper = ({ children, className = "" }: PageWrapperProps) => {
    // Simplified - no transitions for now to test
    return (
        <div className={className}>
            {children}
        </div>
    );
};

export default PageWrapper;
