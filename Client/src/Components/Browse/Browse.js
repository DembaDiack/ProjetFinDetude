import React, { useEffect } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const Browse = props => {


  useEffect(() => {
    document.body.style.backgroundColor = "rgb(36, 41, 46)";

    return () => {
      document.body.style.backgroundColor = "initial";
    }
  });

  return (
    <div className={"container"}>
      <SkeletonTheme color="rgb(36, 41, 46)" highlightColor="#444">
        <section>
          <Skeleton height={50}/>
        </section>

        <section>
        <Skeleton height={window.innerHeight - 200}/>
        </section>
      </SkeletonTheme>


    </div>
  )
}



export default Browse;