import getTasks from '@wasp/queries/getTasks'
import { useQuery } from '@wasp/queries'

const MainPage = () => {
  const { data: tasks, isLoading, error } = useQuery(getTasks)
  return (
    <div>
      {tasks && <TasksList tasks={tasks} />}
      {isLoading && 'Loading...'}
      {error && 'Error: '+error}
    </div>
  )
}

const Task = ({ task }) => {
  return(
    <div>
      <input type="checkbox" id={String(task.id)} checked={task.isDone} />
      {task.description}
    </div>
  )
}

const TasksList = ({ tasks }) => {
  if (!tasks?.length) return <div>No tasks.</div>
  return (
    <div>
      {tasks.map((task, idx) => (
        <Task task={task} key={idx} />
      ))}
    </div>
  )
}

export default MainPage
