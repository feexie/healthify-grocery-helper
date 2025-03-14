
import React from 'react';
import Header from './Header';

interface SiteHeaderProps {
  onVoiceToggle?: (isActive: boolean) => void;
}

const SiteHeader: React.FC<SiteHeaderProps> = ({ onVoiceToggle }) => {
  return <Header onVoiceToggle={onVoiceToggle} />;
};

export default SiteHeader;
