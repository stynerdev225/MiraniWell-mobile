import { useUserContext } from "@/context/SmartAuthContext";
import { Loader } from "@/components/shared";

const GlobalLoader = () => {
    const { isLoading, isInitialized } = useUserContext();

    // Only show loader during initial authentication check - no navigation loading
    const shouldShowLoader = !isInitialized && isLoading;

    if (!shouldShowLoader) return null;

    return (
        <div className="fixed inset-0 z-50 bg-dark-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Loader />
                <p className="text-light-2 text-sm">Loading Mirani Well...</p>
            </div>
        </div>
    );
};

export default GlobalLoader;
