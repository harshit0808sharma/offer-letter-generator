
'use client';
import { useRouter } from "next/navigation";
import { createContext, useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [category, setCategory] = useState("Full-Time");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    candidateName: "",
    jobTitle: "",
    joiningDate: "",
    location: "",
    salary: "",
    hrManagerName: "",
  });
  const [pendingLetters, setPendingLetters] = useState([]);
  const [cookieExists, setCookieExists] = useState("notExists");
  const router = useRouter();
  const previewRef = useRef();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("pendingLetters") || "[]");
    setPendingLetters(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("pendingLetters", JSON.stringify(pendingLetters));
  }, [pendingLetters]);

  useEffect(() => {
    const stored = localStorage.getItem("cookieExists");
    if (stored) {
      const { value, expiresAt } = JSON.parse(stored);
      if (Date.now() < expiresAt) {
        setCookieExists(value);
        if (value === "exists") setIsAuthenticated(true);
      } else {
        localStorage.removeItem("cookieExists");
        setCookieExists("notExists");
        setIsAuthenticated(false);
      }
    }
  }, []);

  useEffect(() => {
    if (cookieExists === "exists") {
      const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
      localStorage.setItem("cookieExists", JSON.stringify({ value: "exists", expiresAt }));
    } else {
      localStorage.removeItem("cookieExists");
    }
  }, [cookieExists]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const savePendingLetter = () => {
    if (!formData.candidateName) {
      toast.error("Candidate Name is required.");
      return;
    }
    const newLetter = { id: Date.now(), ...formData, category, savedAt: new Date().toISOString() };
    setPendingLetters((prev) => [newLetter, ...prev]);
    toast.success("Letter saved to pending!");
    setFormData({ candidateName: "", jobTitle: "", joiningDate: "", location: "", salary: "", hrManagerName: "" });
  };

  const deletePendingLetter = (id) => {
    setPendingLetters((prev) => prev.filter((letter) => letter.id !== id));
    toast.info("Letter removed from pending.");
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
  if (
    !formData.candidateName ||
    !formData.jobTitle ||
    !formData.joiningDate ||
    !formData.location ||
    !formData.salary ||
    !formData.hrManagerName
  ) {
    toast.error("Please fill in all required fields before generating the letter.");
    return;
  }

  try {
    const pages = document.querySelectorAll(".page");
    const pdf = new jsPDF("p", "pt", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;

    const watermarkSrc = "/images/LokaciWatermark.png"; 
    const wmScale = 0.6; 
    const wmRotationDeg = -45;
    const wmAlpha = 0.12;

    const loadImage = (src) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Image load error"));
        img.src = src;
      });

    let watermarkImgEl;
    try {
      watermarkImgEl = await loadImage(watermarkSrc);
    } catch (err) {
      const resp = await fetch(watermarkSrc);
      const blob = await resp.blob();
      const dataUrl = await new Promise((res) => {
        const fr = new FileReader();
        fr.onload = () => res(fr.result);
        fr.readAsDataURL(blob);
      });
      watermarkImgEl = await loadImage(dataUrl);
    }

    for (let i = 0; i < pages.length; i++) {
      const canvas = await html2canvas(pages[i], { scale: 2, scrollY: -window.scrollY });

      const finalCanvas = document.createElement("canvas");
      finalCanvas.width = canvas.width;
      finalCanvas.height = canvas.height;
      const ctx = finalCanvas.getContext("2d");

      ctx.drawImage(canvas, 0, 0);

      const wmWidthPx = finalCanvas.width * wmScale;
      const aspect = watermarkImgEl.height / watermarkImgEl.width;
      const wmHeightPx = wmWidthPx * aspect;

      ctx.save();
      ctx.globalAlpha = wmAlpha;
      ctx.translate(finalCanvas.width / 2, finalCanvas.height / 2);
      ctx.rotate((wmRotationDeg * Math.PI) / 180);
      ctx.drawImage(watermarkImgEl, -wmWidthPx / 2, -wmHeightPx / 2, wmWidthPx, wmHeightPx);
      ctx.restore();
      ctx.globalAlpha = 1;

      const imgData = finalCanvas.toDataURL("image/jpeg", 1.0);
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (finalCanvas.height * imgWidth) / finalCanvas.width;

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, "JPEG", margin, margin, imgWidth, imgHeight);

      pdf.setFontSize(10);
      pdf.text(`Page ${i + 1}`, pageWidth / 2, pageHeight - 20, { align: "center" });
    }

    pdf.save(`${formData.candidateName}_Offer_Letter.pdf`);
    saveToRecentLetters();
    toast.success("Offer letter generated and saved to recent!");
  } catch (error) {
    console.error(error);
    toast.error("Error generating PDF. Please try again.");
  }
};






  const saveToRecentLetters = () => {
    const newLetter = {
      candidateName: formData.candidateName,
      jobTitle: formData.jobTitle,
      joiningDate: formData.joiningDate,
      location: formData.location,
      salary: formData.salary,
      hrManagerName: formData.hrManagerName,
      category,
      generatedAt: new Date().toISOString(),
    };
    const existingLetters = JSON.parse(localStorage.getItem("recentLetters") || "[]");
    existingLetters.unshift(newLetter);
    localStorage.setItem("recentLetters", JSON.stringify(existingLetters));

    setFormData({ candidateName: "", jobTitle: "", joiningDate: "", location: "", salary: "", hrManagerName: "" });
  };

  const handleLogout = () => {
    Cookies.remove("authToken", { path: "/" });
    setIsAuthenticated(false);
    setCookieExists("notExists");
    router.push("/login");
  };

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
        isAuthenticated,
        setIsAuthenticated,
        cookieExists,
        setCookieExists,
        handleLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
