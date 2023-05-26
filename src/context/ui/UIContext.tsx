import { createContext } from 'react'
interface ContextProp {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
    isButton: boolean;

    // Metodos
    openSideMenu: () => void;
    closeSideMenu: () => void;
    
    setIsAddingEntry: (isAdding: boolean) => void;
    startDragging: () => void; 
    endDragging: () => void;
    startButton: () => void
    endButton: () => void;
}

export const UIContext = createContext({} as ContextProp)
