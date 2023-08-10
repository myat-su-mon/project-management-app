import { db } from "../../../../lib/db";
import { getUserFromCookie } from "../../../../lib/auth";
import { cookies } from "next/headers";
import TaskCard from "../../../../components/TaskCard";

const getData = async (id) => {
  const user = await getUserFromCookie(cookies());

  const project = await db.project.findFirst({
    where: {
      id,
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });
};

const ProjectPage = async ({ params }) => {
  const project = await getData(params.id);

  return (
    <div className="h-full overflow-y-auto pr-6 w-1/1">
      <TaskCard tasks={project?.tasks} title={project?.name} />
    </div>
  );
};

export default ProjectPage;
