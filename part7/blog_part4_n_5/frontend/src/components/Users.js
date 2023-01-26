const Users = ({users}) => {
  console.log('user ', users)

  return (<div>
    <table>
      <thead>
        <tr>
          <td></td>
          <td>Blog created</td>
        </tr>
      </thead>
      <tbody>
      {users.map(user => <User userObj={user}/>)}
      </tbody>
    </table>
   
  </div>)
  
}

const User = ({userObj}) => {
  return (<tr>
    <td>{userObj.name}</td>
    <td>{userObj.blogs.length}</td>
  </tr>)
}

export default Users