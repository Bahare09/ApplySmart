import "./loadingCircle.css";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

function LoadingCircle() {

    return (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 36, color: "black", marginBottom: "24px" }} spin />} tip={<span style={{ color: "black" }}>Loading...</span>} fullscreen />
    )

}

export default LoadingCircle;
