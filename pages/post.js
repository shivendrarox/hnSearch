import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import parse from 'html-react-parser';
import styles from '../styles/Post.module.css'
import Image from 'next/image'

const PostDetailPage = () => {
  const router = useRouter()
  const { objectID } = router.query
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [errorEncountered,setErrorEncountered] = useState(false)
  
  useEffect(() => {
    if (!router.isReady) return;

       fetch('https://hn.algolia.com/api/v1/items/' + objectID)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      }).catch(
        (error) => {
          setLoading(false);
          setErrorEncountered(true);
        }
      )

    
  }, [router.isReady])

if (errorEncountered){
  return(
    <a href="/" className={styles.main}>
        Technical error. Go back and search again
      </a> 
  )
}
  return (
    <>


              {isLoading ? <p className={styles.main}>
        Loading...
      </p> :
        <>
          {data.title && <h1 className={styles.title}>
          {data.title}
        </h1>}
          
             

        <p className={styles.description}>
          Total Points: {data.points}
        </p>


          <div className={styles.comment_section} >
          
  
          {data.children?.length && 
          <>
            <p style={{textAlign:"left"}} className={styles.description}>
    Comments:
        </p>
            <ul style={{overflowWrap: 'break-word'}} >{renderChild(data.children)}</ul>
          </>
          }
        </div>
        </>
      }





      <footer className={styles.footer}>
        <a
          href="/__repl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built on
          <span className={styles.logo}>
            <Image src="/replit.svg" alt="Replit Logo" width={20} height={18} />
          </span>
          Replit
        </a>
      </footer>


    </>
  )
}
const Children = (props) => (
  <>
    <li style={{overflowWrap: 'break-word'}}>
      {parse(props.children.text+" -"+props.children.author)} 
      {props.children.children && (
        <ul style={{overflowWrap: 'break-word'}} >{renderChild(props.children.children)}</ul>
      )}
    </li>
  </>
);

const renderChild = (item) => item.map((it) => <Children key={it.id} children={it} />);



export default PostDetailPage