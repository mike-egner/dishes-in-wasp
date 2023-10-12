import getTasks from '@wasp/queries/getTasks'
import createTask from '@wasp/actions/createTask'
import { useQuery } from '@wasp/queries'

const MainPage = () => {
  const { data: tasks, isLoading, error } = useQuery(getTasks)
  return (
    <div>
      <NewTaskForm/>
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

const NewTaskForm = () => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const target = event.target
      const description = target.description.value
      target.reset()
      await createTask({description})
    } catch (err) {
      window.alert('Error: ' + err.message)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input name="description" type="text" defaultValue="" />
      <input type="submit" value="Create task"/>
    </form>
  )
}

export default MainPage
