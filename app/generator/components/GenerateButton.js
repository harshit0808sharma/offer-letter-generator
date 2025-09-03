import { FaFilePdf } from "react-icons/fa";

const GenerateButton = ({generatePDF}) => {
    
    return (
        <>
            <button
                onClick={generatePDF}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center gap-3 hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
                <FaFilePdf className="text-xl" />
                Generate PDF
            </button>
        </>
    )
}

export default GenerateButton;