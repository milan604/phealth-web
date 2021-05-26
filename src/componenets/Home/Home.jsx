import React from 'react';
import Layout from '../Layout/Custom_Layout/Layout';

const Home = () => {
  return (
      <Layout sidebarSelectedKey="home">
				<div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
					<h1>
					Public Health Administration
					</h1>
				</div>
       </Layout>
  )
}

export default Home
