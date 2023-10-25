// BannerProps.tsx
import React, { ReactNode } from "react";

interface BannerProps {
  children: ReactNode;
  onNext: () => void;
  onPrevious: () => void;
}

export default BannerProps;
