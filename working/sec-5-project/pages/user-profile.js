export default function UserProfilePage({ username }) {
  return (
    <>
      <h1>{username}</h1>
    </>
  ) 
};

export async function getServerSideProps({ params, req, res }) {
  
  return {
    props: {
      username: 'Max'
    }
  }
}