import React, {useState} from "react";
import Card from "./components/Card";

function App() {
  const [books,setBooks] = useState([])
  const [loading,setLoading] = useState(false)
  const [search,setSearch] = useState('')
  const [sortBy,setSortBy] = useState('');
  const triggerSearch = async (event) => {
    event.preventDefault();    
    if(!search || loading)
      return;
    setLoading(true)
    const url = new URL("http://openlibrary.org/search.json"),
    params = {
      q:search.replace(/\s+/g, '-').toLowerCase(), 
      limit:30,
      fields:'key,cover_i,title,author_name,name,publish_date',
      mode:'everything'
    }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const response = await fetch(url);
    setLoading(false)
    const data = await response.json();
    setBooks(data.docs);
  }
  const handleSort = ({target:{value}}) =>{
    setSortBy(value)
    if(value !== ''){
      books.sort((a,b) => {
        const valueA = typeof a[value] === "object" ?  a[value]?.[0] || '': a[value];
        const valueB = typeof a[value] === "object" ?  b[value]?.[0] || '': b[value];
          if (valueA < valueB){
            return -1;
          }
          if (valueA < valueB){
            return 1;
          }
          return 0;
      })
    }else{

    }    
  }

  return (
    <div className="App">
      <header>
        <form className="search-wrapper" onSubmit={triggerSearch}>
          <h1>Book Search</h1>
          <input type="text" className="search" onChange={({target:{value}}) => setSearch(value)}/>
          <button className="search-btn" type="submit">Search</button>
        </form>  
      </header>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <div className="sort-wrapper">
          <label>
            Sort By
              <select value={sortBy} onChange={handleSort}> 
                  <option value="" disabled>Select Option</option>
                  <option value="title">Title</option>
                  <option value="publish_date">Last Published</option>
              </select>
            </label>
          </div>
          <div className="wrapper bookshelf">
            {
              books.map((book,index) => (
                <Card data={book} key={index} />
              ))
            }
          </div>
        </>
      )} 
    </div>
  );
}

export default App;
