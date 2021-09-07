import React from "react";
import './../style/Card.css'

const Image = ({name}) => {
    const sectionStyle = {
        background: `url("https://covers.openlibrary.org/b/id/${name}-M.jpg") 0% 0% / 100% 100%`
    }
    return (
        <div className="front" style={sectionStyle}></div>
    )
}
function Card({data:{title,author_name,cover_i,publish_date}}) { 
  return (
    <figure>
        <div className="perspective">
            <div className="book">
                <div className="cover">   
                        {cover_i && <Image name={cover_i}/>}  
                        <div className="inner inner-left"></div>               
                        <div className="bookshelf">
                            
                        </div>
                </div> 
                <div className="inner inner-right"></div>
            </div> 
        </div> 
        <figcaption>
            <h2>
                <span>{title}</span>
                <span>{author_name?.[0] || '-'}</span>
                <span>{publish_date?.[0] || '-'}</span>
            </h2>
        </figcaption>
    </figure>
  );
}

export default Card;
