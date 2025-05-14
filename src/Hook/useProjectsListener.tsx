import { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../ServicesFirebase/firebase";
import { ProjectType } from "../TypeScript/Types/types";


export const useProjectsListener = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "projects"), (snapshot) => {
      const projectsData: ProjectType[] = snapshot.docs.map((doc) => ({
        uid: doc.id,
        ...(doc.data() as Omit<ProjectType, "uid">),
      }));
      setProjects(projectsData);
    });

    return () => unsubscribe();
  }, []);

  return { projects };
};
