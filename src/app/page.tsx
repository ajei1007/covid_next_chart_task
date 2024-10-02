"use client";

import 'antd/dist/reset.css';
import { Layout } from 'antd';
import ''

const { Header, Content } = Layout;

export default function Home() {
  return (
    <main>
      <Layout style={{ height: '100vh'}}>
        <Header style={{ background: '#ffffff' }}>
          <div>App Title</div>
        </Header>
        <Content>
        </Content>
      </Layout>
    </main>
  );
}
