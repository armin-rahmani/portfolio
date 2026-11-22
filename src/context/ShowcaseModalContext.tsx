import React, { createContext, useContext, useState } from 'react';
import { Project, PROJECTS } from '../data/sidejobData';

interface ShowcaseModalContextType {
  isOpen: boolean;
  activeProject: Project | null;
  openShowcase: (project: Project) => void;
  closeShowcase: () => void;
}

const ShowcaseModalContext = createContext<ShowcaseModalContextType>({
  isOpen: false,
  activeProject: null,
  openShowcase: () => {},
  closeShowcase: () => {}
});

export const useShowcaseModal = () => useContext(ShowcaseModalContext);

export const ShowcaseModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(PROJECTS[0]);

  const openShowcase = (project: Project) => {
    setActiveProject(project);
    setIsOpen(true);
  };

  const closeShowcase = () => {
    setIsOpen(false);
  };

  return (
    <ShowcaseModalContext.Provider
      value={{
        isOpen,
        activeProject,
        openShowcase,
        closeShowcase
      }}
    >
      {children}
    </ShowcaseModalContext.Provider>
  );
};
