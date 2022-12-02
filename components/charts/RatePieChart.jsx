import React from "react";
import { RingProgress } from '@ant-design/plots';

const RatePieChart = ({data}) => {
    const config = {
      autoFit: true,
      percent: Math.ceil(data.rate*100/data.total)/100,
      color: ['#55DBCB','rgba(85,219,203,0.30)'],
      statistic: {
        content: {
          formatter: ({ percent }) => data.rate,
          style: {
            color: '#fff',
            fontSize: 12,
          },
        },
      }, 
    };
    return <RingProgress {...config} />;
};

export default RatePieChart