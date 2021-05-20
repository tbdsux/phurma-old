import React, { useRef, useState } from 'react';
import { ColorButton } from '@components/shared/button';

import { DocumentAddIcon } from '@heroicons/react/outline';
import { apiPostFetch } from '@lib/fetch';
import { QueryManager } from '~types/query';
import { ProjectProps } from '~types/projects';
import Router from 'next/router';
import { ProjectModal } from './project-modal';

export const NewProjectModal = () => {
  const [newProjectModal, setNewProjectModal] = useState(false);

  const inputProjectNameRef = useRef<HTMLInputElement>();
  const createProjectBtn = useRef<HTMLButtonElement>();

  const closeProjectModal = () => {
    setNewProjectModal(false);
  };

  const openProjectModal = () => {
    setNewProjectModal(true);
  };

  const HandleCreateProject = () => {
    createProjectBtn.current.disabled = true;
    createProjectBtn.current.innerHTML = 'Creating Project...';

    const projectname = inputProjectNameRef.current.value;

    apiPostFetch('/api/user/projects/create', {
      name: projectname
    })
      .then((r) => r.json())
      .then((d: QueryManager<ProjectProps>) => {
        Router.push(`/dashboard/projects/${d.data.id}`);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <ProjectModal
      open={newProjectModal}
      onClose={closeProjectModal}
      fnHandler={HandleCreateProject}
      inputProjectNameRef={inputProjectNameRef}
      inputProjectNameDefaultValue={null}
      fnButtonRef={createProjectBtn}
      dialogTitle="Create New Project"
      fnButtonText="Create Project"
      initialFocus={inputProjectNameRef}
    >
      <ColorButton
        onClick={openProjectModal}
        className="py-2 px-4 rounded-lg tracking-wide text-sm inline-flex items-center"
      >
        <DocumentAddIcon className="h-5 w-5 mr-1" />
        New Project
      </ColorButton>
    </ProjectModal>
  );
};
