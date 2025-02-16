import { MdPictureAsPdf } from "react-icons/md";

const WinPrint = () => {
    const print = () => {
        window.print();
    };

    return (
        <button
            aria-label="Print Resume"
            className="exclude-print fixed bottom-5 right-10 font-bold rounded-full bg-white text-[rgb(42,167,69)] shadow-lg border-2 border-white"
            onClick={print}
        >
            <MdPictureAsPdf className="w-10 h-10" title="Print/Save as PDF"/>
        </button>
    );
};

export default WinPrint;
