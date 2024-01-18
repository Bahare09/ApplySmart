import { Flex, Layout, Typography, Image, Grid } from "antd";
import Graphic from "../components/images/Graphic-header.svg";
const { Title } = Typography;
const { Header } = Layout;
const { useBreakpoint } = Grid;

const AppHeader = () => {
    const breakpoints = useBreakpoint();
    return (
        <Header style={{ backgroundColor: "rgba(250, 250, 250, 1)" }} >
            <Flex align="baseline"  justify= "left" >
                <Title level={1}>ApplySmart</Title>
              {!breakpoints.xs &&
                <Image
                    width={"94px"}
                    height={"66px"}
                    src={Graphic}
                    // style={{display: breakpoints.xs ? "none" : "block"}}
                />}
            </Flex>
        </Header>
    )
}

export default AppHeader