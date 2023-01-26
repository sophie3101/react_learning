const User = ({user}) => {
  if ( user === null){
    return null
  }else{
    return (<div>
      <h2>{user.name}</h2>
      <p>added blog </p>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>)
  }
  
}


export default User