import { useEffect, useState } from "react"; 
import { collection, getDocs } from "firebase/firestore";
import { db } from "../ServicesFirebase/firebase";

const useCollaborators = () => {
  const [collaborators, setCollaborators] = useState<any[]>([]);

  useEffect(() => {
    const fetchCollaborators = async () => {
      const proyectosSnapshot = await getDocs(collection(db, "proyectos"));
      const allCollaborators: any[] = [];

      for (const proyectoDoc of proyectosSnapshot.docs) {
        const projectId = proyectoDoc.id;
        const colabRef = collection(db, "proyectos", projectId, "Colaboradores");
        const colabSnapshot = await getDocs(colabRef);

        colabSnapshot.forEach((doc) => {
          const data = doc.data();
          allCollaborators.push({
            id: doc.id,
            ...data,
            projectId,
          });
        });
      }

      setCollaborators(allCollaborators);
    };

    fetchCollaborators();
  }, []);

  return collaborators;
};

export default useCollaborators;