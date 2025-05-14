import React, { useState } from "react";
import useManageProjects from "../../Hook/useManageProjects"; 
import { useUserStore } from "../../Context/context";
import { ProjectType } from "../../TypeScript/Types/types";

const NewProject: React.FC = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [projectData, setProjectData] = useState<ProjectType & { nit: string; activo?: boolean }>({
    uid: "",
    projectTitle: "",
    nit: "",
    activo: true,
  });
  const [selectedProjectUid, setSelectedProjectUid] = useState<string | null>(null);

  const { createProject, updateProject, loading, error } = useManageProjects();
  const { projects } = useUserStore();
  console.log("Proyectos disponibles en contexto:", projects);

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mode = e.target.value;
    setIsUpdate(mode === "update");
    if (mode === "create") {
      setProjectData({
        projectTitle: "",
        nit: "",
        uid: "",
        activo: true,
      });
      setSelectedProjectUid(null);
    }
  };

  const handleProjectSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUid = e.target.value;
    setSelectedProjectUid(selectedUid);
    const selectedProject = projects.find((proj) => proj.uid === selectedUid);
    if (selectedProject) {
      setProjectData({
        projectTitle: selectedProject.projectTitle,
        nit: (selectedProject as any).nit || "",
        uid: selectedUid,
        activo: (selectedProject as any).activo ?? true,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isUpdate && selectedProjectUid) {
      await updateProject(selectedProjectUid, {
        projectTitle: projectData.projectTitle,
        nit: projectData.nit,
        activo: projectData.activo,
      });
      console.log("Proyecto actualizado con éxito");
    } else {
      await createProject({
        projectTitle: projectData.projectTitle,
        nit: projectData.nit,
        uid: "", // El UID se generará al crear
        activo: projectData.activo,
      });
      console.log("Proyecto creado con éxito");
    }

    setProjectData({
      projectTitle: "",
      nit: "",
      uid: "",
      activo: true,
    });
    setSelectedProjectUid(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label
          htmlFor="mode"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Modo
        </label>
        <select
          id="mode"
          onChange={handleModeChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="create">Crear Consorcio</option>
          <option value="update">Actualizar Consorcio</option>
          <option value="update">Desactivar Consorcio</option>
        </select>
      </div>

      {isUpdate && (
        <div className="mb-5">
          <label
            htmlFor="selectProject"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Seleccionar Proyecto
          </label>
          <select
            id="selectProject"
            onChange={handleProjectSelect}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Seleccione un proyecto</option>
            {projects.map((project) => (
              <option key={project.uid} value={project.uid}>
                {project.projectTitle}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-5">
        <label
          htmlFor="projectTitle"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Nombre del proyecto
        </label>
        <input
          type="text"
          id="projectTitle"
          name="projectTitle"
          value={projectData.projectTitle}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Proyecto..."
          required
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="nit"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          NIT (-) DÍGITO DE VERIFICACIÓN
        </label>
        <input
          type="text"
          id="nit"
          name="nit"
          value={projectData.nit}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Ej: 123456789 - 1"
          required
        />
      </div>

      <div className="mb-5">
        <label htmlFor="activo" className="inline-flex items-center space-x-2 text-sm font-medium text-gray-900 dark:text-white">
          <input
            type="checkbox"
            id="activo"
            name="activo"
            checked={projectData.activo}
            onChange={(e) => setProjectData((prev) => ({ ...prev, activo: e.target.checked }))}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <span>Proyecto activo</span>
        </label>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {loading ? "Procesando..." : isUpdate ? "Actualizar" : "Crear"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default NewProject;
