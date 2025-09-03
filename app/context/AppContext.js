'use client';
import { useRouter } from "next/navigation";
import { createContext, useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [category, setCategory] = useState("Full-Time");
    const [formData, setFormData] = useState({
        candidateName: "",
        jobTitle: "",
        joiningDate: "",
        location: "",
        salary: "",
        hrManagerName: "",
    });
    const [pendingLetters, setPendingLetters] = useState([]);
    const router = useRouter();

    const previewRef = useRef();

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("pendingLetters") || "[]");
        setPendingLetters(saved);
    }, []);

    useEffect(() => {
        localStorage.setItem("pendingLetters", JSON.stringify(pendingLetters));
    }, [pendingLetters]);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const savePendingLetter = () => {
        if (!formData.candidateName || !formData.jobTitle) {
            toast.error("Candidate Name and Job Title are required.");
            return;
        }
        const newLetter = {
            id: Date.now(),
            ...formData,
            category,
            savedAt: new Date().toISOString(),
        };
        setPendingLetters((prev) => [newLetter, ...prev]);
        toast.success("Letter saved to pending!");
        setFormData({ candidateName: "", jobTitle: "", joiningDate: "", location: "", salary: "", hrManagerName: "" });
    };

    const deletePendingLetter = (id) => {
        setPendingLetters((prev) => prev.filter((letter) => letter.id !== id));
        toast.info("Letter remove from pending.");
    };

    const editPendingLetter = (id) => {
        const letter = pendingLetters.find((l) => l.id === id);
        if (letter) {
            setFormData(letter);
            setCategory(letter.category || "Full-Time");
            deletePendingLetter(id);
        }
        router.push("/generator");
    };

    const generatePDF = async () => {
        if (!formData.candidateName || !formData.jobTitle) {
            toast.error("Please fill in at least Candidate Name and Job Title.");
            return;
        }

        try {
            const html2pdf = (await import("html2pdf.js")).default;
            const element = previewRef.current;
            const options = {
                margin: 0.5,
                filename: `${formData.candidateName}_Offer_Letter.pdf`,
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
            };

            await html2pdf().set(options).from(element).save();
            toast.success("Offer letter generated successfully!");
        } catch (error) {
            toast.error("Error generating PDF. Please try again.");
            console.error("PDF generation error:", error);
        }
    };

    // console.log(formData);

    return (
        <AppContext.Provider
            value={{
                category,
                setCategory,
                formData,
                setFormData,
                handleInputChange,
                savePendingLetter,
                deletePendingLetter,
                editPendingLetter,
                generatePDF,
                previewRef,
                pendingLetters,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
