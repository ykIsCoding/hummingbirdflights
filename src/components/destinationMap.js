import react,{Component} from 'react'
import * as d3 from 'd3-geo-projection'
import { ComposableMap,Marker,Geographies,Geography,ZoomableGroup,Annotation} from "react-simple-maps"


export default class DestinationMap extends Component{
    
    render(){
        
        const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
        return(
            <>
             
              <ComposableMap projection={d3.geoCylindricalStereographic()} width={1000} height={600}>
              <ZoomableGroup zoom={20} center={[-65.0729766,-50.2575921]} 
              minZoom={20}
              maxZoom={20}
              onMoveEnd={null}
              onMoveStart={null}
              onMove={null}
              >
      <Geographies geography='/mapJson/ne_10m.json'>
        {({geographies, proj}) =>{
        return geographies.map((geo,idx) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#FFF"
              stroke="FFF"
            />
          ))
     } }
      </Geographies>
      <Marker coordinates={[-68.0391978,-54.1853363]}>
        <circle r={0.5} fill="#000" />
        
      </Marker>
      <Marker coordinates={[-57.9008424,-51.6991896]}>
        <circle r={0.5} fill="#000" />
      </Marker>

      <Annotation
        subject={[-68.0391978,-54.1853363]}
        dx={0}
        dy={-2}
        connectorProps={{
          stroke: "#000",
          strokeWidth: 0.35,
          strokeLinecap: "round"
        }}
      >
        <text color="#000000" fontSize={2} y="0" x="10" textAnchor="middle" alignmentBaseline="middle" fill="#F53">
          {"Rio Grande, Argentina"}
        </text>
      </Annotation>
      <Annotation
        subject={[-57.9008424,-51.6991896]}
        dx={0}
        dy={-2}
        connectorProps={{
          stroke: "#000",
          strokeWidth: 0.35,
          strokeLinecap: "round"
        }}
      >
        <text color="#000000" fontSize={2} y="-1" x="0" textAnchor="middle" alignmentBaseline="middle" fill="#F53">
          {"Falkland Islands"}
        </text>
      </Annotation>
      </ZoomableGroup>
    </ComposableMap> 
   
            </>
        )
    }
}