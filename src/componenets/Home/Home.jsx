import React, {Component} from 'react';
import Layout from '../Layout/Custom_Layout/Layout';

// export default class Welcome extends Component {
//   render () {
//     return (
//       // <Layout sidebarSelectedKey="1">
// 				<div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
// 					<h1>
// 					SPOT N PARK Administration
// 					</h1>
// 				</div>
//       // </Layout>
//     );
//   }
// }

const Home = () => {
  return (
      <Layout sidebarSelectedKey="1">
				<div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
					<h1>
					SPOT N PARK Administration
					</h1>
				</div>
       </Layout>
  )
}

export default Home
