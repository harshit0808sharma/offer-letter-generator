'use client';
import { useRouter } from "next/navigation";
import { createContext, useState, useRef, useEffect, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { PDF_CONFIG } from "../config/pdfConfig";

export const AppContext = createContext();

// Constants
const STORAGE_KEYS = {
  PENDING_LETTERS: "pendingLetters",
  RECENT_LETTERS: "recentLetters",
  COOKIE_EXISTS: "cookieExists"
};

const DEFAULT_FORM_DATA = {
  candidateName: "",
  jobTitle: "",
  joiningDate: "",
  location: "",
  salary: "",
  hrManagerName: "",
  employmentType: "Full-time",
  companyName: "Offerly",
  companyAddress: "Offerly, India",
  companyPhone: "(555) 123-4567",
  companyEmail: "hr@offerly.com",
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
  description1: "We are pleased to extend this offer of employment to you for the position detailed below. This offer is made based on your qualifications, experience, and the positive impression you made during our interview process.",
  whatToExpect: [
    "Comprehensive onboarding program during your first week",
    "Access to company benefits and professional development opportunities",
    "Collaborative work environment with experienced team members",
    "Regular performance reviews and career growth discussions",
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
  const [theme, setTheme] = useState(false);

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
      if (!pages.length) {
        toast.error("No pages found to print.");
        return;
      }

      const pdf = new jsPDF("p", "pt", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const headerHeight = 80;
      const footerHeight = 30;
      const margin = PDF_CONFIG?.margin ?? { top: 40, left: 40, right: 40, bottom: 40 };

      // Validate that there's enough space for content
      const availableContentHeight = pageHeight - margin.top - margin.bottom - headerHeight - footerHeight;
      if (availableContentHeight <= 50) {
        throw new Error("Page margins and header/footer are too large - no space left for content.");
      }

      const drawHeader = (pdfDoc) => {
        const centerX = pageWidth / 2;
        const startY = margin.top;

        // Draw header background
        pdfDoc.setFillColor(248, 250, 252);
        pdfDoc.rect(margin.left, startY, pageWidth - margin.left - margin.right, headerHeight, 'F');

        // Company name
        pdfDoc.setFontSize(20);
        pdfDoc.setFont("times", "bold");
        pdfDoc.setTextColor(17, 24, 39);
        pdfDoc.text(formData.companyName || '[Company Name]', centerX, startY + 30, { align: "center" });

        // Subtitle
        pdfDoc.setFontSize(14);
        pdfDoc.setFont("times", "normal");
        pdfDoc.setTextColor(75, 85, 99);
        pdfDoc.text("Professional Services", centerX, startY + 50, { align: "center" });

        // Address and contact
        pdfDoc.setFontSize(12);
        pdfDoc.setTextColor(107, 114, 128);
        const addressText = `${formData.companyAddress || '[Company Address]'} | Phone: ${formData.companyPhone || '[Company Phone]'}`;
        pdfDoc.text(addressText, centerX, startY + 70, { 
          align: "center", 
          maxWidth: pageWidth - margin.left - margin.right - 20 
        });
      };

      const drawFooter = (pdfDoc, pageNumber, totalPages) => {
        const footerY = pageHeight - margin.bottom - 10;
        
        // Page number
        pdfDoc.setFontSize(10);
        pdfDoc.setTextColor(100, 100, 100);
        pdfDoc.text(`Page ${pageNumber}${totalPages ? ` of ${totalPages}` : ''}`, pageWidth / 2, footerY, { align: 'center' });
        
        // Footer line
        pdfDoc.setDrawColor(200, 200, 200);
        pdfDoc.line(margin.left, footerY - 15, pageWidth - margin.right, footerY - 15);
      };

      let currentPageNumber = 0;
      let isFirstPage = true;
      const allCanvases = [];

      // First pass: convert all pages to canvases
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        
        // Check if page has actual content
        const hasContent = page.textContent?.trim() || page.querySelector('img, canvas, svg');
        if (!hasContent) {
          console.log(`Skipping empty page ${i + 1}`);
          continue;
        }

        const canvas = await html2canvas(page, {
          scale: PDF_CONFIG?.scale ?? Math.max(1.5, window.devicePixelRatio || 1),
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#FFFFFF',
          logging: false,
          width: page.scrollWidth,
          height: page.scrollHeight,
          onclone: (clonedDoc) => {
            // Ensure all elements are visible in the clone
            const elements = clonedDoc.querySelectorAll('*');
            elements.forEach(el => {
              if (el.style) {
                el.style.transform = '';
                el.style.transformOrigin = '';
              }
            });
          }
        });

        if (canvas.width === 0 || canvas.height === 0) {
          console.warn(`Canvas for page ${i + 1} has zero dimensions, skipping`);
          continue;
        }

        allCanvases.push(canvas);
      }

      if (allCanvases.length === 0) {
        toast.error("No content found to generate PDF.");
        return;
      }

      // Second pass: process canvases and create PDF pages
      for (let canvasIndex = 0; canvasIndex < allCanvases.length; canvasIndex++) {
        const canvas = allCanvases[canvasIndex];
        
        // Calculate dimensions and conversion factors
        const contentWidthPt = pageWidth - (margin.left + margin.right);
        const pxPerPt = canvas.width / contentWidthPt;
        const totalContentHeightPt = canvas.height / pxPerPt;
        const availableHeightPt = availableContentHeight;

        let remainingHeightPt = totalContentHeightPt;
        let yOffsetPt = 0;

        // Split canvas into pages
        while (remainingHeightPt > 0) {
          const sliceHeightPt = Math.min(remainingHeightPt, availableHeightPt);
          const sliceHeightPx = Math.max(1, Math.round(sliceHeightPt * pxPerPt));
          const sourceYpx = Math.round(yOffsetPt * pxPerPt);

          // Defensive bounds checking
          const maxAvailablePx = Math.max(0, canvas.height - sourceYpx);
          const actualSliceHeightPx = Math.min(sliceHeightPx, maxAvailablePx);
          
          if (actualSliceHeightPx <= 0) {
            console.warn('No more content to slice, breaking');
            break;
          }

          const actualSliceHeightPt = actualSliceHeightPx / pxPerPt;

          // Create slice canvas with proper error handling
          const sliceCanvas = document.createElement('canvas');
          sliceCanvas.width = canvas.width;
          sliceCanvas.height = actualSliceHeightPx;
          
          const sliceCtx = sliceCanvas.getContext('2d');
          if (!sliceCtx) {
            throw new Error('Failed to get 2D context for slice canvas');
          }
          
          sliceCtx.imageSmoothingEnabled = true;
          sliceCtx.imageSmoothingQuality = 'high';
          
          try {
            sliceCtx.drawImage(
              canvas,
              0, sourceYpx,
              canvas.width, actualSliceHeightPx,
              0, 0,
              sliceCanvas.width, sliceCanvas.height
            );
          } catch (drawError) {
            console.error('Error drawing image slice:', drawError);
            throw new Error(`Failed to create content slice: ${drawError.message}`);
          }

          // Convert to data URL with error handling
          let sliceImgData;
          try {
            sliceImgData = sliceCanvas.toDataURL('image/jpeg', PDF_CONFIG?.quality ?? 0.92);
            if (!sliceImgData || sliceImgData === 'data:,') {
              throw new Error('Canvas toDataURL returned empty result');
            }
          } catch (err) {
            console.error('toDataURL failed:', err);
            throw new Error(`Failed to convert content to image: ${err.message}`);
          }

          // Add new page (except for the very first page)
          if (!isFirstPage) {
            pdf.addPage();
          }
          isFirstPage = false;
          currentPageNumber++;

          // Always draw header and footer
          drawHeader(pdf);
          drawFooter(pdf, currentPageNumber);

          // Add content image
          try {
            pdf.addImage(
              sliceImgData, 
              'JPEG', 
              margin.left, 
              margin.top + headerHeight + 10, 
              contentWidthPt, 
              actualSliceHeightPt
            );
          } catch (imgError) {
            console.error('Error adding image to PDF:', imgError);
            throw new Error(`Failed to add content to PDF: ${imgError.message}`);
          }

          // Update for next iteration
          remainingHeightPt -= actualSliceHeightPt;
          yOffsetPt += actualSliceHeightPt;

          // Clean up slice canvas
          sliceCanvas.width = 0;
          sliceCanvas.height = 0;

          // Safety check to prevent infinite loops
          if (remainingHeightPt > 0 && actualSliceHeightPt === 0) {
            console.warn('No progress made in slicing, breaking to prevent infinite loop');
            break;
          }
        }
      }

      // Generate filename and save
      const safeCandidateName = (formData.candidateName || 'Candidate')
        .replace(/[^a-zA-Z0-9\s-_]/g, '')
        .replace(/\s+/g, '_')
        .substring(0, 50);
      const filename = `${safeCandidateName}_Offer_Letter_${new Date().toISOString().split('T')[0]}.pdf`;
      
      pdf.save(filename);

      if (saveToRecentLetters) {
        try {
          await saveToRecentLetters();
        } catch (saveError) {
          console.warn('Failed to save to recent letters:', saveError);
        }
      }

      toast.success(`Offer letter generated successfully! (${currentPageNumber} pages)`);

    } catch (err) {
      console.error("PDF generation error:", err);
      const errorMessage = err?.message || String(err);
      toast.error(`Error generating PDF: ${errorMessage}. Please try again.`);
    }
  }, [validateRequiredFields, formData, saveToRecentLetters]);

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
    fieldRefs,
    theme,
    setTheme
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
    isAuthenticated,
    cookieExists,
    handleLogout,
    activeField,
    theme
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};