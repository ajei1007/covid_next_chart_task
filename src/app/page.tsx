"use client";

import 'antd/dist/reset.css';
import { Layout, Typography, Row, Col, Button, Space } from 'antd';
import { DownloadOutlined, FilterOutlined, AlignLeftOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { DataCard } from './components/DataCard';

const { Header, Content } = Layout;
const { Title } = Typography;

const remoteAPIURL = process.env.NEXT_PUBLIC_REMOTE_API;

export default function Home() {
  const [notesCount] = useState(3);
  const [like, setLike] = useState<{ [key: string]: boolean }>({});

  const covidData_2024 = `${remoteAPIURL}?year=2024&page_size=365`;

  const handleLikeClick = (year: string) => {
    setLike((prevLikes) => ({ ...prevLikes, [year]: !prevLikes[year] }));
  };

  return (
    <main>
      <Layout style={{ height: '100vh' }}>
        <Header style={{ background: '#ffffff', padding: '0 20px', display: 'flex', alignItems: 'center' }}>
          <Title level={3} style={{ margin: 0 }}>Covid-19</Title>
        </Header>
        <Content style={{ padding: '20px 10%' }}>
          <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
            <Title level={4} style={{ margin: 0 }}>Covid-19 Testing Positivity 7-Day Rolling</Title>
            <Space>
              <Button icon={<DownloadOutlined />}>Export to PDF</Button>
              <Button icon={<AlignLeftOutlined />}>{`Notes (${notesCount})`}</Button>
              <Button icon={<FilterOutlined />}>Filter</Button>
            </Space>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <DataCard
                title="Column Chart"
                chartType="column"
                dataUrl={covidData_2024}
                liked={like['column'] || false}
                onLikeClick={() => handleLikeClick('column')}
              />
            </Col>
            <Col xs={24} md={12}>
              <DataCard
                title="Line Chart"
                chartType="line"
                dataUrl={covidData_2024}
                liked={like['line'] || false}
                onLikeClick={() => handleLikeClick('line')}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
    </main>
  );
}