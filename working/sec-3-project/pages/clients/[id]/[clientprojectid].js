import { useRouter } from "next/router";

function SelectedClientsProjectsPage() {
  
  const router = useRouter();

  console.log(router.query);

  return (
    <div>
      <h1>Selected Project of Individual Clients Page</h1>
    </div>
  )
}
export default SelectedClientsProjectsPage;