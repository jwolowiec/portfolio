import {CgSpinner} from "react-icons/cg";

interface SpinnerProps {
    size?: number;
}

export default function Spinner({size = 24}: SpinnerProps) {
    return (
        <div className="flex justify-center items-center">
            <CgSpinner size={size} className="animate-spin"/>
        </div>
    );
}