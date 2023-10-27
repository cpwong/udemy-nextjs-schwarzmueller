import { useRouter } from "next/router";

function ClientsProjectsPage() {
  
  const router = useRouter();
  console.log(router.query);

  const loadProjectHandler = () => {
    // router.push('/clients/max/projecta');
    router.push({
      pathname: '/clients/[id]/[clientprojectid]',
      query: { id: 'max', clientprojectid: 'projecta' }
    })
  }

  return (
    <div>
      <h1>Individual Clients Page</h1>
      <button onClick={loadProjectHandler}>Load Project</button>
    </div>
  )
}
export default ClientsProjectsPage;