import React from 'react';

export type ModalCategory = 'cinematic' | 'showcase' | 'reference';

export interface ModalContent {
  title: string;
  subtitle?: string;
  label?: string;
  content: React.ReactNode;
  category: ModalCategory;
  tags?: string[]; // Added for showcase grid
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