import React from "react"
import Skeleton,{SkeletonTheme} from "react-loading-skeleton"

const SeachPlaceHolder = props => {
    return(
        <div>
      <div style={{display : "grid",gridTemplateColumns : "0.5fr 2fr",alignItems : "center",marginBottom : 15,marginTop : 15}}>
    <div style={{justifySelf : "center",paddingRight : 5}}>
      <Skeleton circle={true} width={50} height={50}/>
      </div>
      <div style={{paddingRight : 10}}>
        <Skeleton/>
        </div>
    </div>
    <div style={{display : "grid",gridTemplateColumns : "0.5fr 2fr",alignItems : "center",marginBottom : 15}}>
    <div style={{justifySelf : "center",paddingRight : 5}}>
      <Skeleton circle={true} width={50} height={50}/>
      </div>
      <div style={{paddingRight : 10}}>
        <Skeleton/>
        </div>
    </div>
    <div style={{display : "grid",gridTemplateColumns : "0.5fr 2fr",alignItems : "center",marginBottom : 15}}>
    <div style={{justifySelf : "center",paddingRight : 5}}>
      <Skeleton circle={true} width={50} height={50}/>
      </div>
      <div style={{paddingRight : 10}}>
        <Skeleton/>
        </div>
    </div>
    </div>
    )
}


export default SeachPlaceHolder;