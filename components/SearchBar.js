import {useState,useEffect} from 'react'
import debounce from 'lodash.debounce'
import SkeletonCustomLoader from "./SkeletonCustomLoader"
import styles from "./SearchBar.module.css"
const SearchBar = () =>{
  const [filteredApiResponse,setFilteredApiResponse] = useState([])
  const [dataLoading,setDataLoading] = useState(false)
  const [errorEncountered,setErrorEncountered] = useState(false)

  const doSearchDataFilter = debounce( async (query) =>{
    if (!query||query==''){
      setFilteredApiResponse([])
      return
    } 
        setDataLoading(true)
try{
        setErrorEncountered(false)
         const  hnItemsArray = await fetch("https://hn.algolia.com/api/v1/search?query="+query+"&hitsPerPage=5")
          .then((response) => response.json())
   if(hnItemsArray.hits.length===0){
     setFilteredApiResponse([{"title":
       "Try another query"}])
     return
   }
    
      setFilteredApiResponse(hnItemsArray.hits)
}catch(e){
      setErrorEncountered(true)
          setDataLoading(false)
    }
 

  },500)

    useEffect(() => {
        setDataLoading(false)
  }, [filteredApiResponse]);

  
  return(
    <>
       <div className={"mt-3 mb-3 ",styles.form_container}>
        <input
          type="text"
          className={styles.search_bar}
          placeholder="search here..."
          onChange={event => (doSearchDataFilter(event.target.value))}
        />
      </div>
      <div style={{height:'220px'}} >
              {errorEncountered&&<p>Facing technical issue please try again</p>}
      {dataLoading?
<>
          <div className={styles.result_item}>
  <SkeletonCustomLoader/>
            </div>

           <div className={styles.result_item}>
  <SkeletonCustomLoader/>
            </div>

           <div className={styles.result_item}>
  <SkeletonCustomLoader/>
            </div>

           <div className={styles.result_item}>
  <SkeletonCustomLoader/>
            </div>

           <div className={styles.result_item}>
  <SkeletonCustomLoader/>
            </div>
</>
                :
      <>
        <div>
        {filteredApiResponse?.map((item, index) => (
        <div key={item.id} className={styles.result_item}>
          {item.objectID?
                 <a href={"/post?objectID="+item.objectID} key={index}>{item.title||item.story_title}</a>
            :
              <p key={index}>{item.title||item.story_title}</p>
          }
  
          </div>
        ))}
   
      </div>
      </>
      }
      </div>


    </>
  )
}

export default SearchBar