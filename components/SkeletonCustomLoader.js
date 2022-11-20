import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={300}
    height={40}
    viewBox="0 0 300 40"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="510" y="234" rx="3" ry="3" width="88" height="6" /> 
    <rect x="542" y="236" rx="3" ry="3" width="52" height="6" /> 
    <rect x="20" y="17" rx="3" ry="3" width="410" height="6" /> 
    <rect x="19" y="32" rx="3" ry="3" width="178" height="6" /> 
    <circle cx="588" cy="245" r="20" />
  </ContentLoader>
)

export default MyLoader

