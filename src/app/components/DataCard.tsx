"use client";

import { Card, Avatar } from 'antd';
import { HeartOutlined, HeartFilled, UserOutlined } from '@ant-design/icons';
import { ChartComponent } from './Chart';

interface DataCardProps {
    title: string;
    chartType: string;
    dataUrl: string;
    liked: boolean;
    onLikeClick: () => void;
  }


export function DataCard({ title, chartType, dataUrl, liked, onLikeClick }: DataCardProps) {
    return (
      <Card title={title} style={{ height: '100%' }}>
        <ChartComponent type={chartType} url={dataUrl} />
        <div className="flex justify-between" style={{ marginTop: '10px' }}>
          <Avatar icon={<UserOutlined />} />
          <div className="cursor-pointer" onClick={onLikeClick}>
            {liked ? (
              <HeartFilled style={{ color: '#eb2f96', fontSize: 20 }} />
            ) : (
              <HeartOutlined style={{ color: '#eb2f96', fontSize: 20 }} />
            )}
          </div>
        </div>
      </Card>
    );
  }