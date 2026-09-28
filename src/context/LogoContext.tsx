import React, { createContext, useContext, useState, useEffect } from "react";

interface LogoContextType {
  customLogo: string | null;
  customLogoWhite: string | null;
  logoScale: number;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  uploadLogo: (dataUrl: string) => void;
  uploadLogoWhite: (dataUrl: string) => void;
  setLogoScale: (scale: number) => void;
  resetToDefault: () => void;
}

const STORAGE_KEY_MAIN = "le_limra_custom_logo_v2";
const STORAGE_KEY_WHITE = "le_limra_custom_logo_white_v2";
const STORAGE_KEY_SCALE = "le_limra_logo_scale_v2";

const LogoContext = createContext<LogoContextType | undefined>(undefined);

export const LogoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [customLogoWhite, setCustomLogoWhite] = useState<string | null>(null);
  const [logoScale, setLogoScaleState] = useState<number>(100);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load saved logos from localStorage
  useEffect(() => {
    try {
      const savedLogo = localStorage.getItem(STORAGE_KEY_MAIN);
      const savedWhite = localStorage.getItem(STORAGE_KEY_WHITE);
      const savedScale = localStorage.getItem(STORAGE_KEY_SCALE);

      if (savedLogo) setCustomLogo(savedLogo);
      if (savedWhite) setCustomLogoWhite(savedWhite);
      if (savedScale) setLogoScaleState(Number(savedScale) || 100);
    } catch {
      // localStorage may be disabled
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const uploadLogo = (dataUrl: string) => {
    setCustomLogo(dataUrl);
    try {
      localStorage.setItem(STORAGE_KEY_MAIN, dataUrl);
    } catch {
      // ignore quota errors
    }
  };

  const uploadLogoWhite = (dataUrl: string) => {
    setCustomLogoWhite(dataUrl);
    try {
      localStorage.setItem(STORAGE_KEY_WHITE, dataUrl);
    } catch {
      // ignore quota errors
    }
  };

  const setLogoScale = (scale: number) => {
    setLogoScaleState(scale);
    try {
      localStorage.setItem(STORAGE_KEY_SCALE, String(scale));
    } catch {
      // ignore
    }
  };

  const resetToDefault = () => {
    setCustomLogo(null);
    setCustomLogoWhite(null);
    setLogoScaleState(100);
    try {
      localStorage.removeItem(STORAGE_KEY_MAIN);
      localStorage.removeItem(STORAGE_KEY_WHITE);
      localStorage.removeItem(STORAGE_KEY_SCALE);
    } catch {
      // ignore
    }
  };

  return (
    <LogoContext.Provider
      value={{
        customLogo,
        customLogoWhite,
        logoScale,
        isModalOpen,
        openModal,
        closeModal,
        uploadLogo,
        uploadLogoWhite,
        setLogoScale,
        resetToDefault,
      }}
    >
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = () => {
  const context = useContext(LogoContext);
  if (!context) {
    throw new Error("useLogo must be used within a LogoProvider");
  }
  return context;
};
