'use client';
import { useRouter } from "next/navigation";
import { createContext, useState, useRef, useEffect, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const AppContext = createContext();

// Constants
const STORAGE_KEYS = {
  PENDING_LETTERS: "pendingLetters",
  RECENT_LETTERS: "recentLetters",
  COOKIE_EXISTS: "cookieExists"
};

const WATERMARK_CONFIG = {
  scale: 0.6,
  alpha: 0.12,
  src: "/images/logo.png"
};

const PDF_CONFIG = {
  margin: 20,
  scale: 2,
  quality: 1.0
};

const DEFAULT_FORM_DATA = {
  candidateName: "",
  jobTitle: "",
  joiningDate: "",
  location: "",
  salary: "",
  hrManagerName: "",
  employmentType: "Full-time",
  companyName: "The Salon Company",
  companyAddress: "Lokaci H.Q., Sector 117, Noida",
  companyPhone: "(555) 123-4567",
  companyEmail: "hr@lokaci.com",
  probationPeriod: "90 days",
  workingHours: "Monday to Friday, 9:00 AM to 6:00 PM",
  offerDeadline: "",
  officeHours: "Monday - Friday, 9:00 AM - 5:00 PM",
  documentsRequired: [
    "Government-issued photo identification",
    "Educational certificates and transcripts",
    "Previous employment certificates (if applicable)",
    "Address proof documents",
    "Bank account details for salary processing",
  ],
};

export const AppProvider = ({ children }) => {
  const [category, setCategory] = useState("Full-Time");
  const [activeField, setActiveField] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [pendingLetters, setPendingLetters] = useState([]);
  const [recentLetters, setRecentLetters] = useState([]);
  const [cookieExists, setCookieExists] = useState("notExists");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const router = useRouter();
  const previewRef = useRef();
  const fieldRefs = useRef({});

  const getStorageItem = useCallback((key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return defaultValue;
    }
  }, []);

  const setStorageItem = useCallback((key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
    }
  }, []);

  const resetFormData = useCallback(() => {
    setFormData({
      ...DEFAULT_FORM_DATA,
      candidateName: "",
      jobTitle: "",
      joiningDate: "",
      location: "",
      salary: "",
      hrManagerName: ""
    });
  }, []);

  const validateAuthState = useCallback(() => {
    const stored = getStorageItem(STORAGE_KEYS.COOKIE_EXISTS);
    if (stored) {
      const { value, expiresAt } = stored;
      if (Date.now() < expiresAt) {
        setCookieExists(value);
        if (value === "exists") {
          setIsAuthenticated(true);
          Cookies.set("authToken", "true", { expires: 1 });
        }
        return true;
      } else {
        localStorage.removeItem(STORAGE_KEYS.COOKIE_EXISTS);
        setCookieExists("notExists");
        setIsAuthenticated(false);
        Cookies.remove("authToken");
      }
    }
    return false;
  }, [getStorageItem]);

const clearAuthState = useCallback(() => {
  Cookies.remove("authToken", { path: "/" });
  localStorage.removeItem(STORAGE_KEYS.COOKIE_EXISTS);
  setIsAuthenticated(false);
  setCookieExists(null);
  router.push("/login"); 
}, [router]);


  useEffect(() => {
    if (activeField && fieldRefs.current[activeField]) {
      fieldRefs.current[activeField].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeField]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.COOKIE_EXISTS);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.expiresAt > Date.now()) {
          setCookieExists("exists");
        } else {
          localStorage.removeItem(STORAGE_KEYS.COOKIE_EXISTS);
          setCookieExists("notExists");
        }
      } catch (e) {
        localStorage.removeItem(STORAGE_KEYS.COOKIE_EXISTS);
        setCookieExists("notExists");
      }
    }
  }, []);

  useEffect(() => {
    const saved = getStorageItem(STORAGE_KEYS.PENDING_LETTERS, []);
    console.log('Loading pending letters on mount:', saved);
    setPendingLetters(saved);
  }, [getStorageItem]);

  useEffect(() => {
    const saved = getStorageItem(STORAGE_KEYS.RECENT_LETTERS, []);
    console.log('Loading recent letters on mount:', saved);
    setRecentLetters(saved);
  }, [getStorageItem]);

  useEffect(() => {
    console.log('Saving pending letters to localStorage:', pendingLetters);
    setStorageItem(STORAGE_KEYS.PENDING_LETTERS, pendingLetters);
  }, [pendingLetters, setStorageItem]);

  useEffect(() => {
    console.log('Saving recent letters to localStorage:', recentLetters);
    setStorageItem(STORAGE_KEYS.RECENT_LETTERS, recentLetters);
  }, [recentLetters, setStorageItem]);

  useEffect(() => {
    if (!isLoggingOut) {
      validateAuthState();
    }
  }, [validateAuthState, isLoggingOut]);

  useEffect(() => {
    if (!isLoggingOut && cookieExists === "exists") {
      const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
      setStorageItem(STORAGE_KEYS.COOKIE_EXISTS, { value: "exists", expiresAt });
    }
  }, [cookieExists, setStorageItem, isLoggingOut]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEYS.COOKIE_EXISTS && e.newValue === null && !isLoggingOut) {
        clearAuthState();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [clearAuthState, isLoggingOut]);

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setActiveField(field);
  }, []);

  const savePendingLetter = useCallback(() => {
    if (!formData.candidateName?.trim()) {
      toast.error("Candidate Name is required.");
      return;
    }

    const newLetter = {
      id: Date.now(),
      ...formData,
      category,
      savedAt: new Date().toISOString()
    };

    setPendingLetters((prev) => {
      const updatedLetters = [newLetter, ...prev];
      console.log('Saving pending letter:', newLetter);
      console.log('Updated pending letters:', updatedLetters);
      return updatedLetters;
    });
    toast.success("Letter saved to pending!");
    resetFormData();
  }, [formData, category, resetFormData]);

  const deletePendingLetter = useCallback((id) => {
    setPendingLetters((prev) => {
      const updatedLetters = prev.filter((letter) => letter.id !== id);
      console.log('Deleting pending letter with id:', id);
      console.log('Updated pending letters after delete:', updatedLetters);
      return updatedLetters;
    });
    toast.info("Letter removed from pending.");
  }, []);

  const editPendingLetter = useCallback((id) => {
    const letter = pendingLetters.find((l) => l.id === id);
    if (letter) {
      setFormData(letter);
      setCategory(letter.category || "Full-Time");
      deletePendingLetter(id);
      router.push("/generator");
    }
  }, [pendingLetters, deletePendingLetter, router]);

  // const deleteRecentLetter = useCallback((id) => {
  //   setRecentLetters((prev) => {
  //     const updatedLetters = prev.filter((letter) => letter.id !== id);
  //     console.log('Deleting recent letter with id:', id);
  //     console.log('Updated recent letters after delete:', updatedLetters);
  //     return updatedLetters;
  //   });
  //   toast.info("Letter removed from recent.");
  // }, []);
  const deleteAllRecentLetters = useCallback(() => {
    setRecentLetters([]); 
    localStorage.removeItem(STORAGE_KEYS.RECENT_LETTERS); 
    toast.info("All recent letters have been removed.");
  }, []);


  const validateRequiredFields = useCallback(() => {
    const requiredFields = [
      'candidateName', 'jobTitle', 'joiningDate', 'location', 'salary',
      'hrManagerName', 'employmentType', 'companyName', 'companyAddress',
      'companyPhone', 'companyEmail', 'probationPeriod', 'workingHours', 'officeHours'
    ];

    return requiredFields.every(field => formData[field]?.toString().trim());
  }, [formData]);

  const loadImage = useCallback(async (src) => {
    try {
      return await new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Image load error"));
        img.src = src;
      });
    } catch (err) {
      const resp = await fetch(src);
      const blob = await resp.blob();
      const dataUrl = await new Promise((resolve) => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result);
        fr.readAsDataURL(blob);
      });
      return loadImage(dataUrl);
    }
  }, []);

  const addWatermarkToCanvas = useCallback((canvas, watermarkImg) => {
    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = canvas.width;
    finalCanvas.height = canvas.height;
    const ctx = finalCanvas.getContext("2d");

    ctx.drawImage(canvas, 0, 0);

    const wmWidthPx = finalCanvas.width * WATERMARK_CONFIG.scale;
    const aspect = watermarkImg.height / watermarkImg.width;
    const wmHeightPx = wmWidthPx * aspect;

    ctx.save();
    ctx.globalAlpha = WATERMARK_CONFIG.alpha;
    ctx.translate(finalCanvas.width / 2, finalCanvas.height / 2);
    ctx.drawImage(watermarkImg, -wmWidthPx / 2, -wmHeightPx / 2, wmWidthPx, wmHeightPx);
    ctx.restore();
    ctx.globalAlpha = 1;

    return finalCanvas;
  }, []);

  const saveToRecentLetters = useCallback(() => {
    const newLetter = {
      id: Date.now(),
      candidateName: formData.candidateName,
      jobTitle: formData.jobTitle,
      joiningDate: formData.joiningDate,
      location: formData.location,
      salary: formData.salary,
      hrManagerName: formData.hrManagerName,
      category,
      generatedAt: new Date().toISOString(),
    };

    console.log('Adding new recent letter:', newLetter);
    setRecentLetters(prev => {
      const updatedLetters = [newLetter, ...prev];
      console.log('Updated recent letters state:', updatedLetters);
      return updatedLetters;
    });

    resetFormData();
  }, [formData, category, resetFormData]);

  const generatePDF = useCallback(async () => {
    if (!validateRequiredFields()) {
      toast.error("Please fill in all required fields before generating the letter.");
      return;
    }

    try {
      const pages = document.querySelectorAll(".page");
      const pdf = new jsPDF("p", "pt", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const watermarkImg = await loadImage(WATERMARK_CONFIG.src);

      for (let i = 0; i < pages.length; i++) {
        const canvas = await html2canvas(pages[i], {
          scale: PDF_CONFIG.scale,
          scrollY: -window.scrollY
        });

        const finalCanvas = addWatermarkToCanvas(canvas, watermarkImg);
        const imgData = finalCanvas.toDataURL("image/jpeg", PDF_CONFIG.quality);

        const imgWidth = pageWidth - PDF_CONFIG.margin * 2;
        const imgHeight = (finalCanvas.height * imgWidth) / finalCanvas.width;

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", PDF_CONFIG.margin, PDF_CONFIG.margin, imgWidth, imgHeight);

        pdf.setFontSize(10);
        pdf.text(`Page ${i + 1}`, pageWidth / 2, pageHeight - 20, { align: "center" });
      }

      pdf.save(`${formData.candidateName}_Offer_Letter.pdf`);
      saveToRecentLetters();
      toast.success("Offer letter generated and saved to recent!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Error generating PDF. Please try again.");
    }
  }, [validateRequiredFields, formData.candidateName, loadImage, addWatermarkToCanvas, saveToRecentLetters]);

  const handleLogout = useCallback(() => {
    console.log('Starting logout process...');
    setIsLoggingOut(true);
    clearAuthState();

    setTimeout(() => {
      setIsLoggingOut(false);
    }, 100);
  }, [clearAuthState]);

  const contextValue = useMemo(() => ({
    category,
    setCategory,
    formData,
    setFormData,
    handleInputChange,
    savePendingLetter,
    deletePendingLetter,
    editPendingLetter,
    deleteAllRecentLetters, 
    generatePDF,
    previewRef,
    pendingLetters,
    recentLetters, 
    isAuthenticated,
    setIsAuthenticated,
    cookieExists,
    setCookieExists,
    handleLogout,
    activeField,
    setActiveField,
    fieldRefs
  }), [
    category,
    formData,
    handleInputChange,
    savePendingLetter,
    deletePendingLetter,
    editPendingLetter,
    deleteAllRecentLetters,
    generatePDF,
    pendingLetters,
    recentLetters, 
    setRecentLetters,
    isAuthenticated,
    cookieExists,
    handleLogout,
    activeField
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};