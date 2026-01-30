import React from 'react';

export type ModalCategory = 'cinematic' | 'showcase' | 'reference' | 'gallery';
export type ModalLayout = 'default' | 'reverse' | 'vertical-text-top' | 'vertical-image-top';

export interface ModalContent {
  title: string;
  subtitle?: string;
  label?: string;
  content: React.ReactNode;
  category: ModalCategory;
  tags?: string[]; // Added for showcase grid
  image?: string; // Specific image for the modal
  modalLayout?: ModalLayout; // Layout configuration
  galleryImages?: string[]; // For gallery modal
}

export interface CardProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  onClick?: () => void;
  hoverEffect?: boolean;
  gradient?: string; // Explicit gradient control
}

export interface SectionProps {
  id: string;
}