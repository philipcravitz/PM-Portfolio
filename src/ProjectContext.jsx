import React, { createContext, useState } from 'react';

export const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projectTitle, setProjectTitle] = useState(null);

  return (
    <ProjectContext.Provider value={{ projectTitle, setProjectTitle }}>
      {children}
    </ProjectContext.Provider>
  );
}