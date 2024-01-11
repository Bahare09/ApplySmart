import { Flex, Layout, Typography, Image } from "antd";
import Graphic from "../components/images/Graphic-header.svg"
const { Title } = Typography;
const { Header } = Layout


const AppHeader = () => {

    return (
        <Header style={{ backgroundColor: "rgba(250, 250, 250, 1)" }} >
            <Flex align="baseline" justify="left" gap="24px">
                <Title level={4}>ApplySmart</Title>
                <Image
                    width={"94px"}
                    height={"66px"}
                    src={Graphic}
                />
            </Flex>
        </Header>
    )
}

export default AppHeader