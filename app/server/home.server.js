import { getAllSections , updateSection } from "../database/queries";

// loader 
export async function loader() {
    const sections = await getAllSections();
    const data = {
        sections: sections
    };
    return data;
}

export async function action() {
    
}

// action