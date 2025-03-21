// import useFetch from "../../hooks/useFetch";
// import "./propertyList.css";

// const PropertyList = () => {
//   const { data, loading, error } = useFetch("/api/hotels/countByType");
//   const imgaes = [
//     "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
//     "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
//     "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
//     "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-hostels_300/7d0b5f4b35b6336697c9791692372f9591b5d817.jpg",
//     "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
//   ];
//   return (
//     <div className="pList">
//       {loading ? (
//         "Loading Please Wait.. "
//       ) : (
//         <>
//           {data &&
//             imgaes.map((img,index) => (
//               <div className="pListItem">
//                 <img
//                   src={img}
//                   alt=""
//                   className="pListImg"
//                 />
//                 <div className="pListTitles">
//                   <h1>Hotels</h1>
//                   <h2>{data[index].count} {data[index].type}</h2>
//                 </div>
//               </div>
//             ))}
//         </>
//       )}
//     </div>
//   );
// };

// export default PropertyList;

import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

const PropertyList = () => {
  const { data, loading, error } = useFetch("/api/hotels/countByType");

  const typeToImageMap = {
    hotel: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
    apartments: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    resorts: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    villas: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    cabins: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"
  };

  if (loading) return <div>Loading, please wait...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || data.length === 0) return <div>No data found.</div>;

  return (
    <div className="pList">
      {data.map((item, index) => (
        <div className="pListItem" key={index}>
          <img
            src={typeToImageMap[item.type] || "fallback.jpg"}
            alt={item.type}
            className="pListImg"
          />
          <div className="pListTitles">
            <h1>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</h1>
            <h2>{item.count} {item.type}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
