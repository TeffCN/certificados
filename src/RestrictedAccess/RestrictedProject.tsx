import React from "react";
import { ProjectType } from "../TypeScript/Types/types";

interface RestrictedProjectProps {
  projectData: ProjectType & { nit: string; activo?: boolean };
}

const RestrictedProject: React.FC<RestrictedProjectProps> = ({ projectData }) => {
  return (
    <div className="max-w-sm mx-auto">
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Nombre del proyecto
        </label>
        <input
          type="text"
          value={projectData.projectTitle}
          disabled
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          NIT (-) DÍGITO DE VERIFICACIÓN
        </label>
        <input
          type="text"
          value={projectData.nit}
          disabled
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="activo" className="inline-flex items-center space-x-2 text-sm font-medium text-gray-900 dark:text-white">
          <input
            type="checkbox"
            checked={projectData.activo}
            disabled
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <span>Proyecto activo</span>
        </label>
      </div>
    </div>
  );
};

export default RestrictedProject;
