const NotFound = () => {
    return (
      <div className="container text-center p-4">
        <h1>頁面不存在</h1>
        <p  className="h6 p-3">抱歉，我們找不到您要的頁面。</p>
        <img  className="img-fluid" src="https://media.istockphoto.com/id/455594159/vector/dog-house.jpg?s=612x612&w=0&k=20&c=_SFD2YJys-klKNRa1aztD89XFhGgKLxtm5F8OtG5v6g=" />
        <a href="#/home" className="text-primary list-unstyled h5">回到首頁</a>
      </div>
    );
  };
  
  export default NotFound;