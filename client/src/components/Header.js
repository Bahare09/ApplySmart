import { Flex, Layout, Typography, Image } from "antd";
import Graphic from "../components/images/Graphic-header.svg"
const { Title } = Typography;


const Header = () => {
    return (
        <Layout row>
            <Flex align="baseline" justify="left" gap="24px">
                <Title level={4}>ApplySmart</Title>
                <Image
                    width={"94px"}
                    height={"66px"}
                    src={Graphic}
                />


            </Flex>

        </Layout>
    )
}

export default Header